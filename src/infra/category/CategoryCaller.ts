import { addDoc, query, where } from "firebase/firestore";
import { auth } from "../api/firebaseConfig";
import { ApiSong } from "../song/ApiSong";
import type { ApiCategory } from "./ApiCategory";
import { getFirestore, collection, getDocs } from "@firebase/firestore";

export class CategoryCaller {
  private db = getFirestore();
  async createCategory(title: string): Promise<ApiCategory> {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      throw new Error("userId is undefined!");
    }

    const categoryData = {
      title,
      userId,
    };

    // Save data in firestore
    const categoryRef = await addDoc(
      collection(this.db, "categories"),
      categoryData,
    );

    return {
      id: categoryRef.id,
      ...categoryData,
    };
  }

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
