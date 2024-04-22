import type { ApiCategory } from "./ApiCategory";
import { getFirestore, collection, getDocs } from "@firebase/firestore";

export class CategoryCaller {
  async getCategories(): Promise<ApiCategory[]> {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, "categories"));
    return querySnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() } as ApiCategory;
    });
  }
}
