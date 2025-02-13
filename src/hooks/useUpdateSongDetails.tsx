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
        setCurrentDetails(details as SongDetailsView);
        return details;
      } catch (error) {
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
      if (!userId?.trim() || !songId?.trim()) return null;

      setIsLoading(true);

      try {
        // Solo actualizamos los campos que han cambiado
        const current = await songDetailsService.getCurrentSongInfo(
          userId,
          songId,
        );

        if (!current) throw new Error('No existing details found');

        // Solo incluimos los campos que realmente han cambiado
        const fieldsToUpdate = Object.entries(updatedFields).reduce(
          (acc, [key, value]) => {
            if (value !== undefined && value !== current[key]) {
              acc[key] = value;
            }
            return acc;
          },
          {},
        );

        // Si no hay cambios, no hacemos la actualización
        if (Object.keys(fieldsToUpdate).length === 0) {
          Toast.show({
            type: 'info',
            text1: 'No changes detected',
          });
          return current;
        }

        // Actualizar solo los campos modificados
        await songDetailsService.updateSongDetails(
          userId,
          songId,
          updatedFields.key,
          updatedFields.chordList,
          updatedFields.notes,
          updatedFields.lyricLink,
          updatedFields.tabLink,
        );

        // Obtener datos actualizados
        const refreshedDetails = await songDetailsService.getCurrentSongInfo(
          userId,
          songId,
        );

        if (refreshedDetails) {
          setCurrentDetails(refreshedDetails as SongDetailsView);
          if (setSongDetails) {
            setSongDetails([refreshedDetails] as SongDetailsView[]);
          }
        }

        Toast.show({
          type: 'success',
          text1: 'Updated Successfully',
        });

        onSuccess?.();
        return refreshedDetails;
      } catch (error) {
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
