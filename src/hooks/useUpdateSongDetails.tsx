import {useState, useCallback, Dispatch, SetStateAction} from 'react';
import Toast from 'react-native-toast-message';
import {useSongDetailsService} from '../context/SongDetailsServiceContext';
import {SongDetailsView} from '../views/SongDetailsView';
import {UpdateSongDetailsParams} from '../types/songTypes';

export const useUpdateSongDetails = () => {
  const songDetailsService = useSongDetailsService();
  const [isLoading, setIsLoading] = useState(false);
  const [currentDetails, setCurrentDetails] = useState<SongDetailsView | null>(
    null,
  );

  const loadCurrentDetails = useCallback(
    async (userId: string, songId: string) => {
      if (!userId?.trim() || !songId?.trim()) return null;

      setIsLoading(true);
      try {
        const details = await songDetailsService.getCurrentSongInfo(
          userId,
          songId,
        );
        if (details) {
          setCurrentDetails(details as SongDetailsView);
        }
        return details;
      } catch (error) {
        console.error('Failed to load current song details:', error);
        Toast.show({
          type: 'error',
          text1: 'Error loading details',
        });
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [songDetailsService],
  );

  const updateSongDetails = useCallback(
    async (
      userId: string,
      songId: string,
      updatedFields: Partial<UpdateSongDetailsParams>,
      setSongDetails?: Dispatch<SetStateAction<SongDetailsView[] | undefined>>,
      onSuccess?: () => void,
    ) => {
      if (!userId?.trim() || !songId?.trim()) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'User ID and Song ID are required',
        });
        return null;
      }

      setIsLoading(true);

      try {
        // Obtener los datos actuales
        const current = await songDetailsService.getCurrentSongInfo(
          userId,
          songId,
        );

        if (!current) {
          throw new Error('No existing details found');
        }

        // Combinar datos actuales con actualizaciones
        const updatedDetails = {
          key: updatedFields.key ?? current.key,
          chordList: updatedFields.chordList ?? current.chordList,
          notes: updatedFields.notes ?? current.notes,
          lyricLink: updatedFields.lyricLink ?? current.lyricLink,
          tabLink: updatedFields.tabLink ?? current.tabLink,
        };

        // Actualizar solo con los campos combinados
        await songDetailsService.updateSongDetails(
          userId,
          songId,
          updatedDetails.key,
          updatedDetails.chordList,
          updatedDetails.notes,
          updatedDetails.lyricLink,
          updatedDetails.tabLink,
        );

        // Obtener los datos actualizados
        const refreshedDetails = await songDetailsService.getCurrentSongInfo(
          userId,
          songId,
        );

        if (refreshedDetails) {
          if (setSongDetails) {
            setSongDetails([refreshedDetails] as SongDetailsView[]);
          }
          setCurrentDetails(refreshedDetails as SongDetailsView);
        }

        Toast.show({
          type: 'success',
          text1: 'Updated Successfully',
        });

        onSuccess?.();
        return refreshedDetails;
      } catch (error) {
        console.error('Error updating song details:', error);
        Toast.show({
          type: 'error',
          text1: 'Update Failed',
        });
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [songDetailsService],
  );

  const clearCurrentDetails = useCallback(() => {
    setCurrentDetails(null);
  }, []);

  return {
    updateSongDetails,
    loadCurrentDetails,
    currentDetails,
    clearCurrentDetails,
    isLoading,
  };
};
