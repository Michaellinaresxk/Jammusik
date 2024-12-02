import {useState, useCallback} from 'react';
import Toast from 'react-native-toast-message';
import {useSongService} from '../context/SongServiceContext';

export const useUpdateSong = () => {
  const songService = useSongService();
  const [isLoading, setIsLoading] = useState(false);

  const updateSong = useCallback(
    async (
      userId: string,
      categoryId: string,
      songId: string,
      title: string,
      artist: string,
      setSong: (songs: any[]) => void,
      playlistId?: string,
    ) => {
      setIsLoading(true);
      try {
        console.log(
          'Updating Song:',
          userId,
          songId,
          title,
          artist,
          categoryId,
        );

        // Call the service to update the song
        await songService.updateSong(
          userId,
          categoryId,
          songId,
          title,
          artist,
          playlistId,
        );

        console.log('Song update successful');

        // Update the state
        setSongs(currentSongs =>
          currentSongs.map(song =>
            song.id === editingSong.id
              ? {...song, title: values.title, artist: values.artist}
              : song,
          ),
        );

        // Show success toast
        Toast.show({
          type: 'success',
          text1: 'Song Updated Successfully',
        });
      } catch (error) {
        console.error('Failed to update Song', error);

        // Show error toast
        Toast.show({
          type: 'error',
          text1: 'Update Failed',
          text2: 'Could not update song',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [songService],
  );

  return {updateSong, isLoading};
};
