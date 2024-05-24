import type { ApiSongWithOutPlaylist } from "./ApiSongWithOutPlaylist";
import { getFirestore, addDoc, collection } from "@firebase/firestore";
import { auth } from "../api/firebaseConfig";
import { getDocs, query, where } from "firebase/firestore";

export class SongWithOutPlaylistCaller {
  private db = getFirestore();

  async createSongWithOutPlaylist(
    title: string,
    artist: string,
    categoryId: string,
  ): Promise<ApiSongWithOutPlaylist> {
    const userId = auth.currentUser?.uid;
    if (!this.db || !userId) {
      throw new Error("Firestore instance or user ID is undefined!");
    }

    const songData: any = {
      title,
      artist,
      categoryId,
      userId,
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

    const songsCollection = collection(this.db, "songsWithOutPlaylist");
    const cleanedSongData = cleanObject(songData);
    const docRef = await addDoc(songsCollection, cleanedSongData);

    return {
      id: docRef.id,
      ...songData,
    };
  }

  async getSongsWithOutPlaylist(
    categoryId: string,
  ): Promise<ApiSongWithOutPlaylist[]> {
    if (!this.db || !categoryId) {
      throw new Error("Firestore instance or categoryId is undefined!");
    }
    try {
      const songsCollection = collection(this.db, "songsWithOutPlaylist");
      const songsQuery = query(
        songsCollection,
        where("categoryId", "==", categoryId),
      );
      const querySnapshot = await getDocs(songsQuery);

      return querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() } as ApiSongWithOutPlaylist;
      });
    } catch (error) {
      console.error("Error fetching songs:", error);
      throw error;
    }
  }
}
