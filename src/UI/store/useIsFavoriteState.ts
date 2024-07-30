import { create } from "zustand";

interface IsFavoriteState {
  isFavorite: boolean;
  toggleIsFavorite: (
    userId: string,
    songId: string,
    currentStatus: boolean,
  ) => Promise<void>;
}

export const useIsFavoriteState = create<IsFavoriteState>(set => ({
  isFavorite: false,
  toggleIsFavorite: async (
    userId: string,
    songId: string,
    currentStatus: boolean,
  ) => {
    try {
      // Assume toggleFavorite is a function that toggles the favorite status in your backend
      const result = await toggleFavorite(userId, songId, currentStatus);
      if (result.success) {
        set(state => ({
          isFavorite: {
            ...state.isFavorite,
            [songId]: !currentStatus,
          },
        }));
      }
    } catch (error) {
      console.error("Failed to toggle favorite status:", error);
    }
  },
}));

const toggleFavorite = async (
  userId: string,
  songId: string,
  currentStatus: boolean,
) => {
  // Simulate API call to update the favorite status
  return new Promise<{ success: boolean }>(resolve =>
    setTimeout(() => resolve({ success: true }), 500),
  );
};
