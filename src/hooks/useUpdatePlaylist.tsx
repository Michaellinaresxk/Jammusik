import {useState, useCallback} from 'react';
import Toast from 'react-native-toast-message';
import {usePlaylistService} from '../context/PlaylistServiceContext';

export const useUpdatePlaylist = () => {
  const playlistService = usePlaylistService();
  const [isLoading, setIsLoading] = useState(false);

  const updatePlaylist = useCallback(
    async (
      playlistId: string,
      title: string,
      setPlaylists: (playlists: any[]) => void,
    ) => {
      setIsLoading(true);
      try {
        console.log('Updating playlist:', playlistId, title);

        // Call the service to update the playlist
        await playlistService.updatePlaylist(playlistId, title);

        console.log('Playlist update successful');

        // Update the state
        setPlaylists(currentPlaylists =>
          currentPlaylists.map(playlist =>
            playlist.id === playlistId ? {...playlist, title} : playlist,
          ),
        );

        // Show success toast
        Toast.show({
          type: 'success',
          text1: 'Playlist Updated Successfully',
        });
      } catch (error) {
        console.error('Failed to update playlist', error);

        // Show error toast
        Toast.show({
          type: 'error',
          text1: 'Update Failed',
          text2: 'Could not update playlist',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [playlistService],
  );

  return {updatePlaylist, isLoading};
};
