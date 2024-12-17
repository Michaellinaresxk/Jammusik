import {
  addDoc,
  doc,
  query,
  where,
  writeBatch,
  serverTimestamp
} from 'firebase/firestore';
import {auth} from '../api/firebaseConfig';
import type {ApiPlaylist} from './ApiPlaylist';
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  arrayRemove,
  arrayUnion,
  getDoc,
  setDoc,
} from '@firebase/firestore';
import { ApiSong } from '../song/ApiSong';

export class PlaylistCaller {
  private db = getFirestore();

  // Crear un nuevo playlist
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

  // Obtener todos los playlists del usuario
  async getPlaylists(userId: string): Promise<ApiPlaylist[]> {
    if (!userId) {
      throw new Error('userId is undefined!');
    }

    try {
      const playlistsQuery = query(
        collection(this.db, 'playlists'),
        where('userId', '==', userId)
      );

      const querySnapshot = await getDocs(playlistsQuery);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ApiPlaylist));
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
    }
  ): Promise<void> {
    if (!this.db || !playlistId) {
      throw new Error('Firestore instance or playlistId is undefined!');
    }
  
    try {
      const songRef = doc(this.db, 'songs', songData.id);
      
      // Verificar si la canción existe
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
        // Si la canción existe, verificamos si ya está en el playlist
        const currentData = songDoc.data();
        const playlistIds = currentData.playlistIds || [];
        
        if (playlistIds.includes(playlistId)) {
          throw new Error('Song already exists in playlist');
        }
  
        // Añadimos el nuevo playlistId
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
      // Obtenemos todas las canciones que tienen este playlistId
      const songsQuery = query(
        collection(this.db, 'songs'),
        where('playlistIds', 'array-contains', playlistId)
      );

      const querySnapshot = await getDocs(songsQuery);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ApiSong));
    } catch (error) {
      console.error('Error fetching songs from playlist:', error);
      throw error;
    }
  }

  async removeSongFromPlaylist(userId: string, playlistId: string, songId: string): Promise<void> {
    if (!this.db || !playlistId || !songId || !userId) {
      throw new Error('Required parameters are undefined!');
    }
  
    try {
      const songRef = doc(this.db, 'songs', songId);
      const songDoc = await getDoc(songRef);
  
      if (!songDoc.exists()) {
        throw new Error('Song document not found');
      }
  
      // Eliminar el playlistId del array
      await updateDoc(songRef, {
        playlistIds: arrayRemove(playlistId)
      });
  
      // Verificar la actualización
      const verifyDoc = await getDoc(songRef);
      console.log('Song updated:', verifyDoc.data());
  
    } catch (error) {
      console.error('Error removing song from playlist:', error);
      throw error;
    }
  }

  // Borrar un playlist completo
  async deletePlaylist(playlistId: string): Promise<void> {
    if (!playlistId) {
      throw new Error('PlaylistId is required!');
    }

    const batch = writeBatch(this.db);

    try {
      // Borrar todas las relaciones playlist-song
      const playlistSongsQuery = query(
        collection(this.db, 'playlist_songs'),
        where('playlistId', '==', playlistId)
      );
      
      const playlistSongsSnapshot = await getDocs(playlistSongsQuery);
      playlistSongsSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      // Borrar el playlist
      batch.delete(doc(this.db, 'playlists', playlistId));

      await batch.commit();
    } catch (error) {
      console.error('Error deleting playlist:', error);
      throw error;
    }
  }

  // Actualizar el título de un playlist
  async updatePlaylist(playlistId: string, newTitle: string): Promise<void> {
    if (!playlistId) {
      throw new Error('PlaylistId is required!');
    }

    try {
      await updateDoc(doc(this.db, 'playlists', playlistId), {
        title: newTitle,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating playlist:', error);
      throw error;
    }
  }
}
