import {
  addDoc,
  doc,
  query,
  where,
  writeBatch,
  serverTimestamp,
} from 'firebase/firestore';
import {auth} from '../api/firebaseConfig';
import type {ApiPlaylist} from './ApiPlaylist';
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  arrayRemove,
  arrayUnion,
  getDoc,
  setDoc,
} from '@firebase/firestore';
import {ApiSong} from '../song/ApiSong';

export class PlaylistCaller {
  private db = getFirestore();

  // Create a new playlist
  async createPlaylist(title: string): Promise<ApiPlaylist> {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      throw new Error('userId is undefined!');
    }

    const playlistData = {
      title,
      userId,
      createdAt: serverTimestamp(),
    };

    const playlistRef = await addDoc(
      collection(this.db, 'playlists'),
      playlistData,
    );

    return {
      id: playlistRef.id,
      ...playlistData,
    };
  }

  // Get all the user's playlists

  async getPlaylists(userId: string): Promise<ApiPlaylist[]> {
    if (!userId) {
      throw new Error('userId is undefined!');
    }

    try {
      // 1. Get user's own playlists
      const playlistsQuery = query(
        collection(this.db, 'playlists'),
        where('userId', '==', userId),
      );

      const querySnapshot = await getDocs(playlistsQuery);
      const ownPlaylists = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as ApiPlaylist[];

      // 2. Get shared playlists that were accepted
      const sharedPlaylistsQuery = query(
        collection(this.db, 'sharedPlaylists'),
        where('sharedWith', '==', userId),
        where('status', '==', 'accepted'),
      );

      const sharedSnapshot = await getDocs(sharedPlaylistsQuery);

      console.log('Shared playlists found:', sharedSnapshot.docs.length);

      const sharedPlaylistsPromises = sharedSnapshot.docs.map(
        async docSnapshot => {
          const sharedData = docSnapshot.data();
          const originalPlaylistRef = doc(
            this.db,
            'playlists',
            sharedData.originalPlaylistId,
          );

          try {
            const originalPlaylistDoc = await getDoc(originalPlaylistRef);

            if (originalPlaylistDoc.exists()) {
              return {
                id: originalPlaylistDoc.id,
                ...originalPlaylistDoc.data(),
                isShared: true,
                sharedBy: sharedData.sharedBy,
              } as unknown as ApiPlaylist;
            }
          } catch (error) {
            console.error('Error fetching original playlist:', error);
          }
          return null;
        },
      );

      const sharedPlaylists = await Promise.all(sharedPlaylistsPromises);
      const validSharedPlaylists = sharedPlaylists.filter(
        (playlist): playlist is ApiPlaylist => playlist !== null,
      );

      console.log('Own playlists:', ownPlaylists.length);
      console.log('Valid shared playlists:', validSharedPlaylists.length);

      return [...ownPlaylists, ...validSharedPlaylists];
    } catch (error) {
      console.error('Error details:', error);
      throw error;
    }
  }

  async addSongToPlaylist(
    playlistId: string,
    songData: {
      id: string;
      title: string;
      artist: string;
      categoryId: string;
    },
  ): Promise<void> {
    if (!this.db || !playlistId) {
      throw new Error('Firestore instance or playlistId is undefined!');
    }
    try {
      const songRef = doc(this.db, 'songs', songData.id);

      // Check if the song exists
      const songDoc = await getDoc(songRef);
      if (!songDoc.exists()) {
        console.log('Song not found, creating new document');
        // Si la canción no existe, la creamos con el array playlistIds
        await setDoc(songRef, {
          ...songData,
          playlistIds: [playlistId],
          updatedAt: serverTimestamp(),
        });
      } else {
        // If the song does not exist, we create it with the array playlistIds
        const currentData = songDoc.data();
        const playlistIds = currentData.playlistIds || [];

        if (playlistIds.includes(playlistId)) {
          throw new Error('Song already exists in playlist');
        }

        // Add the new playlistId
        await updateDoc(songRef, {
          playlistIds: arrayUnion(playlistId),
          updatedAt: serverTimestamp(),
        });
      }

      console.log(`Song ${songData.id} added to playlist ${playlistId}`);
    } catch (error) {
      console.error('Error adding song to playlist:', error);
      throw error;
    }
  }

  async getPlaylistSongs(playlistId: string): Promise<ApiSong[]> {
    if (!this.db || !playlistId) {
      throw new Error('Firestore instance or playlistId is undefined!');
    }

    try {
      const songsQuery = query(
        collection(this.db, 'songs'),
        where('playlistIds', 'array-contains', playlistId),
      );

      const querySnapshot = await getDocs(songsQuery);
      return querySnapshot.docs.map(
        doc =>
          ({
            id: doc.id,
            ...doc.data(),
          } as ApiSong),
      );
    } catch (error) {
      console.error('Error fetching songs from playlist:', error);
      throw error;
    }
  }

  async removeSongFromPlaylist(
    userId: string,
    playlistId: string,
    songId: string,
  ): Promise<void> {
    if (!this.db || !playlistId || !songId || !userId) {
      throw new Error('Required parameters are undefined!');
    }

    try {
      const songRef = doc(this.db, 'songs', songId);
      const songDoc = await getDoc(songRef);

      if (!songDoc.exists()) {
        throw new Error('Song document not found');
      }

      // Remove the playlistId from the array
      await updateDoc(songRef, {
        playlistIds: arrayRemove(playlistId),
      });

      // Verify the update
      const verifyDoc = await getDoc(songRef);
      console.log('Song updated:', verifyDoc.data());
    } catch (error) {
      console.error('Error removing song from playlist:', error);
      throw error;
    }
  }

  // Delete a complete playlist
  async deletePlaylist(playlistId: string): Promise<void> {
    if (!playlistId) {
      throw new Error('PlaylistId is required!');
    }

    const batch = writeBatch(this.db);

    try {
      // Delete all playlist-song relationships
      const playlistSongsQuery = query(
        collection(this.db, 'playlist_songs'),
        where('playlistId', '==', playlistId),
      );

      const playlistSongsSnapshot = await getDocs(playlistSongsQuery);
      playlistSongsSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      // Delete playlist
      batch.delete(doc(this.db, 'playlists', playlistId));

      await batch.commit();
    } catch (error) {
      console.error('Error deleting playlist:', error);
      throw error;
    }
  }

  // Update playlist title
  async updatePlaylist(playlistId: string, newTitle: string): Promise<void> {
    if (!playlistId) {
      throw new Error('PlaylistId is required!');
    }

    try {
      await updateDoc(doc(this.db, 'playlists', playlistId), {
        title: newTitle,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating playlist:', error);
      throw error;
    }
  }

  // share playlist
  async sharePlaylist(
    playlistId: string,
    recipientEmail: string,
  ): Promise<void> {
    try {
      console.log('Sharing playlist to:', recipientEmail);

      // Find recipient user
      const usersRef = collection(this.db, 'users');
      const q = query(usersRef, where('email', '==', recipientEmail));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error('User not found');
      }

      // Obtener el uid del usuario en lugar del ID del documento
      const recipientData = querySnapshot.docs[0].data();
      const recipientId = recipientData.uid; // Usar el uid almacenado

      console.log('Recipient found:', {
        docId: querySnapshot.docs[0].id,
        uid: recipientId,
      });

      // Update playlist's sharedWith array
      const playlistRef = doc(this.db, 'playlists', playlistId);
      await updateDoc(playlistRef, {
        sharedWith: arrayUnion(recipientId),
      });

      // Create shared playlist record
      const sharedPlaylistData = {
        originalPlaylistId: playlistId,
        sharedBy: auth.currentUser?.uid,
        sharedWith: recipientId, // Usar el uid del usuario
        sharedAt: new Date().toISOString(),
        status: 'pending',
      };

      console.log('Creating shared playlist:', sharedPlaylistData);

      await addDoc(collection(this.db, 'sharedPlaylists'), sharedPlaylistData);
    } catch (error) {
      console.error('Error sharing playlist:', error);
      throw error;
    }
  }

  // get shared playlist
  async getSharedPlaylists(userId: string) {
    try {
      console.log('Getting shared playlists for userId:', userId);

      const sharedPlaylistsRef = collection(this.db, 'sharedPlaylists');
      const q = query(
        sharedPlaylistsRef,
        where('sharedWith', '==', userId),
        where('status', '==', 'pending'),
      );

      const snapshot = await getDocs(q);
      console.log(
        'Raw shared docs:',
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        })),
      );

      const playlists = [];

      for (const docSnapshot of snapshot.docs) {
        const sharedData = docSnapshot.data();
        console.log('Shared data:', sharedData);

        const playlistDocRef = doc(
          this.db,
          'playlists',
          sharedData.originalPlaylistId,
        );
        const playlistDoc = await getDoc(playlistDocRef);
        const playlistData = playlistDoc.data();
        console.log('Playlist data:', playlistData);

        if (playlistData) {
          playlists.push({
            id: docSnapshot.id,
            title: playlistData.title,
            sharedBy: sharedData.sharedBy,
            sharedAt: sharedData.sharedAt,
            status: sharedData.status,
          });
        }
      }

      console.log('Final playlists array:', playlists);
      return playlists;
    } catch (error) {
      console.error('Error getting shared playlists:', error);
      throw error;
    }
  }

  async acceptSharedPlaylist(sharedPlaylistId: string): Promise<void> {
    if (!sharedPlaylistId) {
      throw new Error('sharedPlaylistId is required');
    }

    try {
      const sharedRef = doc(this.db, 'sharedPlaylists', sharedPlaylistId);
      await updateDoc(sharedRef, {
        status: 'accepted',
        acceptedAt: serverTimestamp(),
      });

      console.log('Shared playlist accepted successfully:', sharedPlaylistId);
    } catch (error) {
      console.error('Error accepting shared playlist:', error);
      throw error;
    }
  }

  async rejectSharedPlaylist(sharedPlaylistId: string): Promise<void> {
    const sharedRef = doc(this.db, 'sharedPlaylists', sharedPlaylistId);
    await updateDoc(sharedRef, {
      status: 'rejected',
    });
  }
}
