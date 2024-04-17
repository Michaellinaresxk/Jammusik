import { query, where } from "firebase/firestore";
import type { ApiCategory } from "./ApiCategory";
import { getFirestore, collection, getDocs } from "@firebase/firestore";
import { ApiSong } from "../song/ApiSong";

export class CategoryCaller {
  async getCategories(): Promise<ApiCategory[]> {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, "categories"));
    return querySnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() } as ApiCategory;
    });
  }

  async getSongListByCategory(
    categoryId: string,
    userId: string,
  ): Promise<ApiSong[]> {
    if (!categoryId || !userId) {
      console.error(
        "categoryId or userId is not defined or is an empty string!",
      );
      return [];
    }

    try {
      const db = getFirestore();
      const songCollection = collection(db, "songs");
      // Usa tanto categoryId como userId en la consulta
      const songQuery = query(
        songCollection,
        where("categoryId", "==", categoryId),
        where("userId", "==", userId),
      );
      const querySnapshot = await getDocs(songQuery);

      return querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() } as ApiSong;
      });
    } catch (error) {
      console.error(
        `Error fetching songs for category ${categoryId} and user ${userId}:`,
        error,
      );
      throw error;
    }
  }
}
