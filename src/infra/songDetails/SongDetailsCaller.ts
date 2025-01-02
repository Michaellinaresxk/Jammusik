import {getDocs, query, where} from 'firebase/firestore';
import type {ApiSongDetails} from './ApiSongDetails';
import {getFirestore, addDoc, collection, orderBy} from '@firebase/firestore';

export class SongDetailsCaller {
  private db = getFirestore();

  async setCurrentInfo(
    userId: string,
    songId: string,
    key?: string,
    chordList?: string[],
    notes?: string,
    lyricLink?: string,
    tabLink?: string,
  ): Promise<ApiSongDetails> {
    if (!this.db || !userId || !songId) {
      throw new Error('User ID and Song Id must be provided!');
    }

    const songData: any = {
      userId,
      songId,
      key,
      chordList,
      notes,
      lyricLink,
      tabLink,
    };

    function cleanObject(obj: any) {
      const cleanObj: any = {};
      for (const [key, value] of Object.entries(obj)) {
        if (value !== undefined) {
          cleanObj[key] = value;
        } else {
          cleanObj[key] = null;
        }
      }
      return cleanObj;
    }

    const cleanedSongData = cleanObject(songData);

    // Save data in firestore
    const songDetailsRef = await addDoc(
      collection(this.db, 'songDetails'),
      cleanedSongData,
    );

    return {
      id: songDetailsRef.id,
      ...cleanedSongData,
    };
  }

  async getCurrentSongInfo(
    userId: string,
    songId: string,
  ): Promise<ApiSongDetails | null> {
    if (!userId || !songId) {
      throw new Error('User ID and Song ID must be provided!');
    }
    try {
      const songDetailsCollection = collection(this.db, 'songDetails');
      const songDetailsQuery = query(
        songDetailsCollection,
        where('userId', '==', userId),
        where('songId', '==', songId),
      );
      const querySnapshot = await getDocs(songDetailsQuery);
      if (querySnapshot.empty) {
        return null;
      }
      const doc = querySnapshot.docs[0];
      return {id: doc.id, ...doc.data()} as unknown as ApiSongDetails;
    } catch (error) {
      console.error('Error fetching song details:', error);
      throw error;
    }
  }

  async getSongKeys(): Promise<{id: string; key: string; order: number}[]> {
    try {
      const songKeysCollection = collection(this.db, 'songKeys');
      const songKeysQuery = query(songKeysCollection, orderBy('order'));
      const querySnapshot = await getDocs(songKeysQuery);

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as {key: string; order: number}),
      }));
    } catch (error) {
      console.error('Error fetching song keys:', error);
      throw error;
    }
  }
}
