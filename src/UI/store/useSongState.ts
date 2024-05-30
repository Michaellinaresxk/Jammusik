import { create } from "zustand";

interface SongState {
  isDone: boolean;
  setIsDone: () => void;
  toggleIsDone: () => void;
}

export const useSongState = create<SongState>()(set => ({
  isDone: false,
  setIsDone: () => set(state => ({ isDone: !state.isDone })),
  toggleIsDone: () => set(state => ({ isDone: !state.isDone })),
}));
