import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import type {ApiSongDetails} from './ApiSongDetails';

export class SongDetailsCaller {
  private db = getFirestore();

  private getDocumentId(userId: string, songId: string): string {
    return `${userId}_${songId}`;
  }

  private getDocumentRef(userId: string, songId: string) {
    const docId = this.getDocumentId(userId, songId);
    return doc(this.db, 'songDetails', docId);
  }

  private cleanUndefinedValues(data: Record<string, any>): Record<string, any> {
    return Object.entries(data).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value === undefined ? null : value,
      }),
      {},
    );
  }

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

    const docRef = this.getDocumentRef(userId, songId);
    const timestamp = serverTimestamp();

    const songData = this.cleanUndefinedValues({
      userId,
      songId,
      key,
      chordList,
      notes,
      lyricLink,
      tabLink,
      createdAt: timestamp,
      updatedAt: timestamp,
    });

    await setDoc(docRef, songData);

    return {
      id: docRef.id,
      ...songData,
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
      // Primero intentamos obtener el documento directamente
      const docRef = this.getDocumentRef(userId, songId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        } as ApiSongDetails;
      }

      // Si no encontramos el documento con el ID compuesto, buscamos con query
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
      return {
        id: doc.id,
        ...doc.data(),
      } as ApiSongDetails;
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

  async updateSongDetails(
    userId: string,
    songId: string,
    key?: string,
    chordList?: string[],
    notes?: string,
    lyricLink?: string,
    tabLink?: string,
  ): Promise<void> {
    if (!userId || !songId) {
      throw new Error('userId and songId are required!');
    }

    try {
      // Primero verificamos si existe el documento
      const existingDetails = await this.getCurrentSongInfo(userId, songId);

      if (!existingDetails) {
        // Si no existe, creamos uno nuevo
        await this.setCurrentInfo(
          userId,
          songId,
          key,
          chordList,
          notes,
          lyricLink,
          tabLink,
        );
        return;
      }

      // Si existe, actualizamos el documento existente
      const docRef = this.getDocumentRef(userId, songId);
      const updateData = this.cleanUndefinedValues({
        key,
        chordList,
        notes,
        lyricLink,
        tabLink,
        updatedAt: serverTimestamp(),
      });

      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error('Error updating song details:', error);
      throw error;
    }
  }

  // Método auxiliar para migrar documentos antiguos al nuevo formato de ID
  async migrateOldDocuments(userId: string, songId: string): Promise<void> {
    try {
      const songDetailsCollection = collection(this.db, 'songDetails');
      const songDetailsQuery = query(
        songDetailsCollection,
        where('userId', '==', userId),
        where('songId', '==', songId),
      );

      const querySnapshot = await getDocs(songDetailsQuery);

      if (!querySnapshot.empty) {
        const oldDoc = querySnapshot.docs[0];
        const newDocRef = this.getDocumentRef(userId, songId);

        await setDoc(newDocRef, {
          ...oldDoc.data(),
          updatedAt: serverTimestamp(),
        });

        // Opcionalmente, podrías eliminar el documento antiguo aquí
      }
    } catch (error) {
      console.error('Error migrating documents:', error);
      throw error;
    }
  }
}
