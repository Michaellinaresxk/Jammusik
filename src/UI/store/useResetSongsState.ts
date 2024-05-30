import { create } from "zustand";

interface ResetSongsState {
  resetToggle: boolean;
  resetAllSongs: () => void;
}

export const useResetSongsState = create<ResetSongsState>()(set => ({
  resetToggle: false,
  resetAllSongs: () => set(state => ({ resetToggle: !state.resetToggle })),
}));
