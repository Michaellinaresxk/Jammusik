import {
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { auth } from "../api/firebaseConfig";
import type { ApiPlaylist } from "./ApiPlaylist";
import { getFirestore, collection, getDocs } from "@firebase/firestore";

export class PlaylistCaller {
  private db = getFirestore();
  async createPlaylist(title: string): Promise<ApiPlaylist> {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      throw new Error("userId is undefined!");
    }

    const playlistData = {
      title,
      userId,
    };

    // Save data in firestore
    const playlistRef = await addDoc(
      collection(this.db, "playlists"),
      playlistData,
    );

    return {
      id: playlistRef.id,
      ...playlistData,
    };
  }

  async getPlaylists(userId: string): Promise<ApiPlaylist[]> {
    if (!this.db || !userId) {
      throw new Error("Firestore instance or userId is undefined!");
    }
    try {
      const playlistsCollection = collection(this.db, "playlists");
      const playlistsQuery = query(
        playlistsCollection,
        where("userId", "==", userId),
      );
      const querySnapshot = await getDocs(playlistsQuery);
      return querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() } as ApiPlaylist;
      });
    } catch (error) {
      console.error("Error fetching playlists:", error);
      throw error;
    }
  }

  async deletePlaylist(playlistId: string): Promise<void> {
    if (!this.db || !playlistId) {
      throw new Error("Firestore instance or playlistId is undefined!");
    }

    const db = this.db;
    const batch = writeBatch(db);

    // Query for songs with the specified playlistId
    const songsCollection = collection(db, "songs");
    const songsQuery = query(
      songsCollection,
      where("playlistId", "==", playlistId),
    );
    const querySnapshot = await getDocs(songsQuery);

    // Add delete operations to the batch
    querySnapshot.docs.forEach(doc => batch.delete(doc.ref));

    // Add playlist delete operation to the batch
    const specificPlaylistDoc = doc(db, "playlists", playlistId);
    batch.delete(specificPlaylistDoc);

    // Commit the batch
    await batch.commit();
  }
}
