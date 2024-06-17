import { getFirestore, doc, updateDoc } from "@firebase/firestore";

export const useToggleIsDone = async (
  userId: string,
  songId: string,
  isDone: boolean,
) => {
  try {
    const db = getFirestore();
    const songDocRef = doc(db, "songs", songId);

    await updateDoc(songDocRef, {
      isDone: !isDone,
      userId: userId,
    });

    return { success: true };
  } catch (err) {
    console.error("Error actualizando el documento: ", err);
    return { success: false, error: err };
  }
};
