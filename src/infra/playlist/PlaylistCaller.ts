import type { ApiPlaylist } from './ApiPlaylist'
import { getFirestore, addDoc, collection, getDocs, where, query } from '@firebase/firestore'
import { auth } from '../api/firebaseConfig'
import { deleteDoc, doc } from 'firebase/firestore'

export class PlaylistCaller {
  private db = getFirestore()

  async createPlaylist(
    title: string,
    modeId: string,
  ): Promise<ApiPlaylist> {
    const userId = auth.currentUser?.uid
    if (!userId) {
      throw new Error('userId is undefined!')
    }

    const playlistData = {
      title,
      modeId,
      userId,
    }

    // Save data in firestore
    const playlistRef = await addDoc(collection(this.db, 'playlists'), playlistData)

    return {
      id: playlistRef.id,
      ...playlistData
    }
  }

  async getPlaylists(userId: string): Promise<ApiPlaylist[]> {
    if (!this.db || !userId) {
      throw new Error('Firestore instance or userId is undefined!')
    }
    try {
      const playlistsCollection = collection(this.db, 'playlists')
      const playlistsQuery = query(playlistsCollection, where('userId', '==', userId))
      const querySnapshot = await getDocs(playlistsQuery)

      return querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as ApiPlaylist
      })
    } catch (error) {
      console.error('Error fetching playlists:', error)
      throw error
    }
  }

  async deletePlaylist(playlistId: string) {
    if (!this.db || !playlistId) {
      throw new Error('Firestore instance or playlistId is undefined!')
    }

    const specificPlaylistDoc = doc(this.db, 'playlists', playlistId)
    await deleteDoc(specificPlaylistDoc)
  }
}
