import type {ApiSong} from './ApiSong';
import {getFirestore, addDoc, collection} from '@firebase/firestore';
import {getDocs, where, query, deleteDoc, doc} from 'firebase/firestore';
import {auth} from '../api/firebaseConfig';

export class SongCaller {
  private db = getFirestore();

  async createSong(
    categoryId: string,
    title: string,
    artist: string,
    isDone: boolean,
  ): Promise<ApiSong> {
    const userId = auth.currentUser?.uid;
    if (!this.db || !userId) {
      throw new Error('Firestore instance or user ID is undefined!');
    }

    const songData = {
      userId,
      categoryId,
      title,
      artist,
      isDone,
    };

    console.log('Creating song with data:', songData);

    const songsCollection = collection(this.db, 'songs');
    const docRef = await addDoc(songsCollection, songData);

    return {
      id: docRef.id,
      ...songData,
    };
  }

  async getSongs(playlistId?: string): Promise<ApiSong[]> {
    const songsCollection = collection(this.db, 'songs');
    let songsQuery;

    // Si hay playlistId, buscar canciones que lo contengan en su array
    if (playlistId) {
      songsQuery = query(
        songsCollection,
        where('playlistId', '==', playlistId), // Aquí está usando playlistId como campo directo
      );
    } else {
      songsQuery = query(songsCollection);
    }

    const snapshot = await getDocs(songsQuery);
    return snapshot.docs.map(
      doc =>
        ({
          id: doc.id,
          ...doc.data(),
        } as ApiSong),
    );
  }

  async deleteSong(userId: string, songId: string): Promise<void> {
    if (!this.db || !userId || !songId) {
      throw new Error('Firestore instance or playlistId is undefined!');
    }
    const specificSongDoc = doc(this.db, 'songs', songId);
    await deleteDoc(specificSongDoc);
  }
}
