import {FlatList, StyleSheet, Text, View, ImageBackground} from 'react-native';
import {SharedPlaylistCard} from '../../components/shared/cards/SharedPlaylistCard';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalColors, globalStyles} from '../../theme/Theme';
import {useCallback, useEffect, useState} from 'react';
import {images} from '../../../assets/img/Images';
import {PlaylistView} from '../../../views/PlaylistView';
import {usePlaylistService} from '../../../context/PlaylistServiceContext';
import {getAuth} from 'firebase/auth';
import Toast from 'react-native-toast-message';

export const SharedPlaylistsScreen = () => {
  const [sharedPlaylists, setSharedPlaylists] = useState<PlaylistView[]>([]);
  const playlistService = usePlaylistService();
  const auth = getAuth();

  const image = {
    uri: images?.loginBackground || '',
  };

  const loadSharedPlaylists = useCallback(async () => {
    if (!auth.currentUser) return;

    try {
      const playlists = await playlistService.getSharedPlaylists(
        auth.currentUser.uid,
      );
      setSharedPlaylists(playlists);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to load shared playlists',
      });
    }
  }, [auth.currentUser, playlistService]);

  useEffect(() => {
    loadSharedPlaylists();
  }, [loadSharedPlaylists]);

  const handleAcceptPlaylist = async (sharedPlaylistId: string) => {
    try {
      await playlistService.acceptSharedPlaylist(sharedPlaylistId);
      console.log('Shared playlist accepted successfully.');
      await loadSharedPlaylists(); // Refresh playlists
    } catch (error) {
      console.error('Error accepting playlist:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to accept shared playlist',
      });
    }
  };

  const handleRejectPlaylist = async (sharedPlaylistId: string) => {
    try {
      await playlistService.rejectSharedPlaylist(sharedPlaylistId);
      console.log('Shared playlist rejected successfully.');
      await loadSharedPlaylists(); // Refresh playlists
    } catch (error) {
      console.error('Error rejecting playlist:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to reject shared playlist',
      });
    }
  };

  return (
    <ImageBackground source={image} resizeMode="cover">
      <View style={globalStyles.overlay}>
        <View>
          <View style={styles.header}></View>
          {sharedPlaylists.length === 0 ? (
            <View style={styles.noSharedPlaylistContent}>
              <Icon
                name="musical-notes-outline"
                size={40}
                color={globalColors.primaryAlt}
              />
              <Text style={styles.emptyTitle}>No shared playlists yet</Text>
              <Text style={styles.emptySubtitle}>
                Shared playlists will appear here
              </Text>
            </View>
          ) : (
            <FlatList
              data={sharedPlaylists}
              renderItem={({item}) => (
                <SharedPlaylistCard
                  playlist={item}
                  onAccept={handleAcceptPlaylist}
                  onReject={handleRejectPlaylist}
                />
              )}
              contentContainerStyle={styles.list}
            />
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: globalColors.secondary + '20',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 12,
    color: globalColors.light,
  },

  list: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noSharedPlaylistContent: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 10,
    marginTop: 100,
  },
  subHeaderText: {
    fontSize: 16,
    color: globalColors.light,
    marginTop: 8,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    color: globalColors.primary,
  },
  emptySubtitle: {
    fontSize: 18,
    color: globalColors.light,
    marginTop: 8,
  },
});
