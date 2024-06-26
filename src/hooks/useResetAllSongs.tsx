import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  writeBatch,
} from "@firebase/firestore";

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
    return { success: true };
  } catch (err) {
    console.error("Error reseting songs: ", err);
    return { success: false, error: err };
  }
};
