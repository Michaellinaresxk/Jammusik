import type { ApiSong, ApiSongDetails } from "./ApiSong";
import { getFirestore, addDoc, collection } from "@firebase/firestore";
import {
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  where,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth } from "../api/firebaseConfig";
// import SongDetails from "@/domain/song/SongDetails";

export class SongCaller {
  private db = getFirestore();

  async createSong(
    title: string,
    artist: string,
    categoryId: string,
    playlistId: string,
  ): Promise<ApiSong> {
    const userId = auth.currentUser?.uid;
    if (!this.db || !userId) {
      throw new Error("Firestore instance or user ID is undefined!");
    }

    const songData: any = {
      title,
      artist,
      categoryId,
      playlistId,
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

    const songsCollection = collection(this.db, "songs");
    const cleanedSongData = cleanObject(songData);
    const docRef = await addDoc(songsCollection, cleanedSongData);

    return {
      id: docRef.id,
      ...songData,
    };
  }

  async getSongs(playlistId: string): Promise<ApiSong[]> {
    if (!this.db || !playlistId) {
      throw new Error("Firestore instance or playlistId is undefined!");
    }
    try {
      const songsCollection = collection(this.db, "songs");
      const songsQuery = query(
        songsCollection,
        where("playlistId", "==", playlistId),
      );
      const querySnapshot = await getDocs(songsQuery);

      return querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() } as ApiSong;
      });
    } catch (error) {
      console.error("Error fetching songs:", error);
      throw error;
    }
  }

  // async getSong(songId: string): Promise<ApiSong> {
  //   if (!this.db || !songId) {
  //     throw new Error("Firestore instance or songId is undefined!");
  //   }

  //   try {
  //     const specificSongDoc = doc(this.db, 'songs', songId);
  //     const songSnapshot = await getDoc(specificSongDoc);

  //     if (!songSnapshot.exists()) {
  //       throw new Error("Song not found!");
  //     }

  //     return { id: songSnapshot.id, ...songSnapshot.data() } as ApiSong;

  //   } catch (error) {
  //     console.error("Error fetching the song:", error);
  //     throw error;
  //   }
  // }
  // async setSongDetails(
  //   songId: string,
  //   key?: string,
  //   chordList?: string[],
  //   notes?: string,
  //   lyricLink?: string,
  //   tabLink?: string,
  // ): Promise<ApiSongDetails> {
  //   if (!songId) {
  //     throw new Error("songId is undefined or empty!");
  //   }
  //   const songRef = doc(this.db, 'songDetails', songId);
  //   const songDetails = {
  //     songId: songId,
  //     key: key,
  //     chordList: chordList,
  //     notes: notes,
  //     lyricLink: lyricLink,
  //     tabLink: tabLink
  //   };
  //   const songSnapshot = await getDoc(songRef);
  //   if (!songSnapshot.exists()) {
  //       // If document doesn't exist, create a new one
  //       await setDoc(songRef, songDetails);
  //   } else {
  //     // If document exist, update
  //       await updateDoc(songRef, songDetails);
  //   }
  //   return { ...songDetails };
  // }

  // async getSongDetails(songId: string){
  //  if (!songId) {
  //   throw new Error("songId is undefined or empty!");
  // }
  //   try {
  //     const collectionRef = collection(this.db, "songDetails");
  //     const docRef = doc(collectionRef, songId);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       // If the document exists, we return a new instance of UserInfo
  //       const data = docSnap.data();
  //       return new SongDetails(
  //         songId,
  //         data.key,
  //         data.chordList,
  //         data.notes,
  //         data.lyricLink,
  //         data.tabLink
  //       );
  //     } else {
  //       // If the document does not exist, you can return null or throw an error
  //       console.log("No user info found for user:", songId);
  //       return null;
  //     }
  //   } catch (error) {
  //     console.log("Error getting document:", error);
  //     throw error;
  //   }
  // }

  // async deleteSong(songId: string) {
  //   console.log(songId)
  //   if (!this.db || !songId) {
  //     throw new Error("Firestore instance or songId is undefined!");
  //   }
  //   const specificSongDoc = doc(this.db, 'songs', songId);
  //   await deleteDoc(specificSongDoc);
  // }
}
