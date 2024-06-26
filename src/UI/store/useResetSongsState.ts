import { create } from "zustand";
import { useResetAllSongs } from "../../hooks/useResetAllSongs";

interface ResetSongsState {
  resetToggle: boolean;
  resetAllSongs: (playlistId: string) => Promise<void>;
}

export const useResetSongsState = create<ResetSongsState>(set => ({
  resetToggle: false,
  resetAllSongs: async (playlistId: string) => {
    const result = await useResetAllSongs(playlistId);
    if (result.success) {
      set(state => ({
        resetToggle: !state.resetToggle,
      }));
    } else {
      console.error("Error reseteando las canciones.");
    }
  },
}));
