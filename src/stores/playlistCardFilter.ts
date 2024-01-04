
import { defineStore } from 'pinia'

export const usePlaylistCardFilter = defineStore('playlistCard', {
  state: (): {
    currentFilter: string;
  } => ({
    currentFilter: 'All'
  }),

  actions: {
    setFilter(filter: string) {
      this.currentFilter = filter;
    }
  }
});
