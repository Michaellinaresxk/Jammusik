import { getFirestore, doc, updateDoc } from "@firebase/firestore";

export const useToggleIsDone = (
  userId: string,
  songId: string,
  isDone: boolean,
) => {
  const settingIcons = async (songId: string, changeIcon: boolean) => {
    try {
      const db = getFirestore();

      const songIdDocRef = doc(db, "songs", songId);
      await updateDoc(songIdDocRef, {
        isDone: !changeIcon,
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (!songId) {
    throw new Error("songId is undefined or empty!");
  }

  return { settingIcons };
};
