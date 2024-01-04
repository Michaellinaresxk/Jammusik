import type { Mode } from '../../types/songTypes';
import type { ApiMode } from './ApiMode';
import { getFirestore, collection, getDocs } from '@firebase/firestore';
export class ModeCaller {
  async getModeTitles(): Promise<Mode[]> {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, 'mode'));
    return querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() } as ApiMode;
    });
  }
}
