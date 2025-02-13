import {useState, useCallback, Dispatch, SetStateAction} from 'react';
import Toast from 'react-native-toast-message';
import {useSongDetailsService} from '../context/SongDetailsServiceContext';
import {UpdateSongDetailsParams} from '../types/songTypes';
import {SongDetailsView} from '../views/SongDetailsView';

export const useUpdateSongDetails = () => {
  const songDetailsService = useSongDetailsService();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateSongDetails = useCallback(
    async (
      userId: string,
      songId: string,
      details: UpdateSongDetailsParams,
      setSongDetails?: Dispatch<SetStateAction<SongDetailsView[] | undefined>>,
      onSuccess?: () => void,
    ) => {
      if (!userId?.trim() || !songId?.trim()) {
        const error = new Error('User ID and Song ID are required');
        setError(error);
        Toast.show({
          type: 'error',
          text1: 'Validation Error',
          text2: error.message,
        });
        return null;
      }

      setIsLoading(true);
      setError(null);

      try {
        await songDetailsService.updateSongDetails(
          userId,
          songId,
          details.key,
          details.chordList,
          details.notes,
          details.lyricLink,
          details.tabLink,
        );

        // Obtener datos actualizados
        const refreshedDetails = await songDetailsService.getCurrentSongInfo(
          userId,
          songId,
        );

        if (refreshedDetails && setSongDetails) {
          setSongDetails([refreshedDetails] as SongDetailsView[]);
        }

        Toast.show({
          type: 'success',
          text1: 'Song Details Updated Successfully',
          position: 'bottom',
          visibilityTime: 2000,
        });

        onSuccess?.();

        return refreshedDetails;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to update song details';
        console.error('Failed to update song details:', err);

        setError(new Error(errorMessage));

        Toast.show({
          type: 'error',
          text1: 'Update Failed',
          text2: errorMessage,
          position: 'bottom',
          visibilityTime: 3000,
        });

        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [songDetailsService],
  );

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    updateSongDetails,
    isLoading,
    error,
    resetError,
  };
};
