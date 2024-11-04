import {
  collection,
  query,
  where,
  getDocs,
  writeBatch,
} from "@firebase/firestore";
import { songService } from "../services/songService";
import { getFirestore } from "firebase/firestore";

export const useResetAllSongs = async (playlistId: string) => {
  try {
    const db = getFirestore();
    const songsRef = collection(db, "songs");
    const PlaylistIdRef = query(
      songsRef,
      where("playlistId", "==", playlistId),
    );
    const querySnapshot = await getDocs(PlaylistIdRef);

    const batch = writeBatch(db);

    querySnapshot.forEach(doc => {
      batch.update(doc.ref, { isDone: false });
    });

    await batch.commit();

    // Returns the updated song list after resetting them
    const updatedSongs = await songService.getSongs(playlistId);
    return updatedSongs;
  } catch (err) {
    console.error("Error reseteando canciones: ", err);
    throw err;
  }
};
