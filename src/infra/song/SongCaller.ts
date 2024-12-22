import type {ApiSong} from './ApiSong';
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from '@firebase/firestore';
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

    if (playlistId) {
      songsQuery = query(
        songsCollection,
        where('playlistId', '==', playlistId),
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

  async updateSong(
    userId: string,
    songId: string,
    updates: {
      title: string;
      artist: string;
      categoryId?: string;
    },
  ): Promise<void> {
    if (!this.db || !userId || !songId) {
      throw new Error('Firestore instance, userId, or songId is undefined!');
    }

    const songRef = doc(this.db, 'songs', songId);

    try {
      await updateDoc(songRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating song:', error);
      throw error;
    }
  }

  async deleteSong(userId: string, songId: string): Promise<void> {
    if (!this.db || !userId || !songId) {
      throw new Error('Firestore instance or playlistId is undefined!');
    }
    const specificSongDoc = doc(this.db, 'songs', songId);
    await deleteDoc(specificSongDoc);
  }
}
