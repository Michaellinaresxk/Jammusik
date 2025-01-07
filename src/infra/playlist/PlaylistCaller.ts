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
      const playlistsQuery = query(
        collection(this.db, 'playlists'),
        where('userId', '==', userId),
      );

      const querySnapshot = await getDocs(playlistsQuery);
      return querySnapshot.docs.map(
        doc =>
          ({
            id: doc.id,
            ...doc.data(),
          } as ApiPlaylist),
      );
    } catch (error) {
      console.error('Error fetching playlists:', error);
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
      // Find recipient user
      const usersRef = collection(this.db, 'users');
      const q = query(usersRef, where('email', '==', recipientEmail));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error('User not found');
      }

      const recipientId = querySnapshot.docs[0].id;

      // Update playlist's sharedWith array
      const playlistRef = doc(this.db, 'playlists', playlistId);
      await updateDoc(playlistRef, {
        sharedWith: arrayUnion(recipientId),
      });

      // Create shared playlist record
      await addDoc(collection(this.db, 'sharedPlaylists'), {
        originalPlaylistId: playlistId,
        sharedBy: auth.currentUser?.uid,
        sharedWith: recipientId,
        sharedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error sharing playlist:', error);
      throw error;
    }
  }
}
