import type { ApiSongDetails } from "./ApiSongDetails";
import { getFirestore, addDoc, collection } from "@firebase/firestore";

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
      throw new Error("User ID and Song Id must be provided!");
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
      collection(this.db, "songDetails"),
      cleanedSongData,
    );

    return {
      id: songDetailsRef.id,
      ...cleanedSongData,
    };
  }
}
