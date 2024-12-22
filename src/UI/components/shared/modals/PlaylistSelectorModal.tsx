import React, {useCallback, useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {getAuth} from 'firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalColors} from '../../../theme/Theme';
import {usePlaylistService} from '../../../../context/PlaylistServiceContext';
import {PlaylistView} from '../../../../views/PlaylistView';
import {PrimaryButton} from '../PrimaryButton';
import type {SongData} from '../../../../types/songTypes';
import {KeyboardGestureArea} from 'react-native-keyboard-controller';
import {ScrollView} from 'react-native-gesture-handler';

interface PlaylistSelectorModalProps {
  isVisible: boolean;
  onClose: () => void;
  songData: SongData | null;
  onAddToPlaylist: (playlistId: string) => Promise<void>;
}
export const PlaylistSelectorModal: React.FC<PlaylistSelectorModalProps> = ({
  isVisible,
  onClose,
  onAddToPlaylist,
}) => {
  const [playlists, setPlaylists] = useState<PlaylistView[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();
  const playlistService = usePlaylistService();

  const loadPlaylists = useCallback(async () => {
    console.log('Loading playlists...'); // Debugging
    if (!auth.currentUser?.uid) {
      console.log('No user ID found'); // Debugging
      return;
    }

    setIsLoading(true);
    try {
      const fetchedPlaylists = await playlistService.getPlaylists(
        auth.currentUser.uid,
      );
      console.log('Fetched playlists:', fetchedPlaylists); // Debugging
      setPlaylists(fetchedPlaylists);
    } catch (error) {
      console.error('Failed to fetch playlists:', error);
      Alert.alert('Error', 'Failed to load playlists');
    } finally {
      setIsLoading(false);
    }
  }, [auth.currentUser?.uid, playlistService]);

  useEffect(() => {
    console.log('Modal visibility changed:', isVisible); // Debugging
    if (isVisible) {
      loadPlaylists();
    }
  }, [isVisible, loadPlaylists]);

  const handlePlaylistSelection = async (playlistId: string) => {
    setIsLoading(true);
    try {
      await onAddToPlaylist(playlistId);
    } finally {
      setIsLoading(false);
    }
  };

  const renderPlaylistItem = ({item}: {item: PlaylistView}) => (
    <TouchableOpacity
      style={styles.playlistItem}
      onPress={() => handlePlaylistSelection(item.id)}
      disabled={isLoading}>
      <View style={styles.playlistItemContent}>
        <Icon
          name="musical-notes-sharp"
          size={24}
          color={globalColors.primary}
        />
        <Text style={styles.playlistTitle}>{item.title}</Text>
        <Icon
          name="add-circle-outline"
          size={24}
          color={globalColors.primary}
          style={styles.addIcon}
        />
      </View>
    </TouchableOpacity>
  );
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="formSheet">
      <KeyboardGestureArea interpolator="ios" style={{flex: 1}}>
        <ScrollView horizontal={false} style={{flex: 1}}>
          <View style={styles.modalBtnContainer}>
            <Text style={styles.modalFormHeaderTitle}>Add to a Playlist</Text>
            <PrimaryButton
              label="Close"
              btnFontSize={20}
              colorText={globalColors.light}
              onPress={onClose}
            />
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={globalColors.primary} />
            </View>
          ) : playlists.length === 0 ? (
            <View style={styles.emptyState}>
              <Icon
                name="musical-notes-sharp"
                size={50}
                color={globalColors.terceary}
              />
              <Text style={styles.emptyStateText}>No playlists available</Text>
              <Text style={styles.emptyStateSubText}>
                Create a playlist first to add songs
              </Text>
            </View>
          ) : (
            <FlatList
              data={playlists}
              renderItem={renderPlaylistItem}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              contentContainerStyle={styles.listContainer}
            />
          )}
        </ScrollView>
      </KeyboardGestureArea>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: globalColors.primary,
    paddingLeft: 35,
    paddingRight: 20,
    justifyContent: 'space-between',
  },
  modalFormHeaderTitle: {
    fontSize: 20,
    color: globalColors.light,
  },
  listContainer: {
    padding: 16,
  },
  playlistItem: {
    marginVertical: 8,
    backgroundColor: globalColors.light,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  playlistItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  playlistTitle: {
    marginLeft: 12,
    fontSize: 16,
    color: globalColors.primaryDark,
    flex: 1,
  },
  addIcon: {
    marginLeft: 'auto',
  },
  separator: {
    height: 1,
    backgroundColor: globalColors.terceary,
    opacity: 0.2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    color: globalColors.terceary,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptyStateSubText: {
    color: globalColors.terceary,
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});
