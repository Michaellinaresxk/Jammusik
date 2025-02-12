import {useState, useCallback} from 'react';
import Toast from 'react-native-toast-message';
import {useSongDetailsService} from '../context/SongDetailsServiceContext';

interface UpdateSongDetailsData {
  key?: string;
  chordList?: string[];
  notes?: string;
  lyricLink?: string;
  tabLink?: string;
}

export const useUpdateSongDetails = () => {
  const songDetailsService = useSongDetailsService();
  const [isLoading, setIsLoading] = useState(false);

  const updateSongDetails = useCallback(
    async (
      userId: string,
      songId: string,
      updateData: UpdateSongDetailsData,
      setSongDetails?: Function,
    ) => {
      setIsLoading(true);
      try {
        console.log('Updating song details:', {userId, songId, updateData});

        const updatedDetails = await songDetailsService.updateSongDetails(
          userId,
          songId,
          updateData.key,
          updateData.chordList,
          updateData.notes,
          updateData.lyricLink,
          updateData.tabLink,
        );

        if (setSongDetails) {
          setSongDetails(updatedDetails);
        }

        Toast.show({
          type: 'success',
          text1: 'Song Details Updated Successfully',
        });

        return updatedDetails;
      } catch (error) {
        console.error('Failed to update song details:', error);
        Toast.show({
          type: 'error',
          text1: 'Update Failed',
          text2: 'Could not update song details',
        });
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [songDetailsService],
  );

  return {updateSongDetails, isLoading};
};
