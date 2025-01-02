import {getFirestore, doc, updateDoc, getDoc} from '@firebase/firestore';

export const useToggleIsDone = async (
  userId: string,
  songId: string,
  isDone: boolean,
) => {
  try {
    const db = getFirestore();
    const songDocRef = doc(db, 'songs', songId);

    await updateDoc(songDocRef, {
      isDone: !isDone,
      userId: userId,
    });

    return {success: true};
  } catch (err) {
    console.error('Error actualizando el documento: ', err);
    return {success: false, error: err};
  }
};

export const getIsDone = async (songId: string) => {
  try {
    const db = getFirestore();
    const songDocRef = doc(db, 'songs', songId);
    const songDoc = await getDoc(songDocRef);

    if (songDoc.exists()) {
      const songData = songDoc.data();
      return songData.isDone;
    } else {
      console.error('No such document!');
      return false;
    }
  } catch (err) {
    console.error('Error obteniendo el documento: ', err);
    return false;
  }
};
