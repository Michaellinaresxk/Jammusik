import { query, where } from "firebase/firestore";
import { ApiSong } from "../song/ApiSong";
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

  async getAllSongsByUserId(userId: string): Promise<ApiSong[]> {
    const db = getFirestore();
    try {
      const songsCollection = collection(db, "songs");
      const songsQuery = query(songsCollection, where("userId", "==", userId));
      const querySnapshot = await getDocs(songsQuery);
      return querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() } as ApiSong;
      });
    } catch (error) {
      console.error("Error fetching songs:", error);
      throw error;
    }
  }
}
