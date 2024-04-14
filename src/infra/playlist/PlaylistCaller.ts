import type { ApiPlaylist } from "./ApiPlaylist";
import { getFirestore, collection, getDocs } from "@firebase/firestore";

export class PlaylistCaller {
  async getPlaylists(): Promise<ApiPlaylist[]> {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, "playlists"));
    return querySnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() } as ApiPlaylist;
    });
  }
}

//   if (!this.db || !userId) {
//     throw new Error("Firestore instance or userId is undefined!");
//   }
//   try {
//     const playlistsCollection = collection(this.db, "playlists");
//     const playlistsQuery = query(
//       playlistsCollection,
//       where("userId", "==", userId),
//     );
//     const querySnapshot = await getDocs(playlistsQuery);
//     return querySnapshot.docs.map(doc => {
//       return { id: doc.id, ...doc.data() } as ApiPlaylist;
//     });
//   } catch (error) {
//     console.error("Error fetching playlists:", error);
//     throw error;
//   }
