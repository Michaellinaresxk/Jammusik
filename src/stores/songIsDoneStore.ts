import { defineStore } from 'pinia';
import { type SongCard } from '../types/songTypes';

export const songIsDone = defineStore('songCard', {
  state: () => ({
    song: [] as SongCard[],
  }),

  actions: {
    toggleSongEditingStatus(song: SongCard) {
      song.isEditing = true;
    },
    resetAllSongs(songList: SongCard[]) {
      songList.map((song: SongCard) => {
        if (song.isEditing) {
          return (song.isEditing = false);
        }
      });
    },
  },
});
