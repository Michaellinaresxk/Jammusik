import {create} from 'zustand';
import {useToggleIsDone} from '../hooks/useToggleIsDone';

interface SongState {
  isDone: boolean;
  toggleIsDone: (
    userId: string,
    songId: string,
    currentStatus: boolean,
  ) => Promise<void>;
}

export const useSongState = create<SongState>(set => ({
  isDone: false,
  toggleIsDone: async (userId: string, songId: string, isDone: boolean) => {
    const result = await useToggleIsDone(userId, songId, isDone);
    if (result.success) {
      set(state => ({
        isDone: !state.isDone,
      }));
    }
  },
}));
