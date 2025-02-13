import {useCallback} from 'react';
import {songService} from '../services/songService';
import Toast from 'react-native-toast-message';

interface UpdateSongParams {
  title: string;
  artist: string;
  categoryId?: string;
}

interface UseSongUpdatesProps {
  userId: string;
  onSuccess: () => void;
  setIsUpdating: (isUpdating: boolean) => void;
}

export const useSongUpdates = ({
  userId,
  onSuccess,
  setIsUpdating,
}: UseSongUpdatesProps) => {
  const updateSong = useCallback(
    async (songId: string, updates: UpdateSongParams) => {
      if (!userId || !songId) {
        Toast.show({
          type: 'error',
          text1: 'Update failed',
          text2: 'Missing required information',
          topOffset: 90,
        });
        return false;
      }

      setIsUpdating(true);
      try {
        await songService.updateSong(userId, songId, updates);

        Toast.show({
          type: 'success',
          text1: 'Song updated successfully',
          topOffset: 90,
        });

        onSuccess();
        return true;
      } catch (error) {
        console.error('Update error:', error);

        Toast.show({
          type: 'error',
          text1: 'Failed to update song',
          text2: 'Please try again',
          topOffset: 90,
        });

        return false;
      } finally {
        setIsUpdating(false);
      }
    },
    [userId, onSuccess, setIsUpdating],
  );

  return {
    updateSong,
  };
};
