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
import {useCategoryService} from '../../../../context/CategoryServiceContext';
import {usePlaylistService} from '../../../../context/PlaylistServiceContext';
import {SongView} from '../../../../views/SongView';
import {PrimaryButton} from '../PrimaryButton';

interface SongSelectorModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAddSong: (songData: SongView[]) => Promise<void>;
  playlistId: string;
}

export const SongSelectorModal: React.FC<SongSelectorModalProps> = ({
  isVisible,
  onClose,
  onAddSong,
  playlistId,
}) => {
  const [songs, setSongs] = useState<SongView[]>([]);
  const [playlistSongs, setPlaylistSongs] = useState<Set<string>>(new Set());
  const [selectedSongs, setSelectedSongs] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const auth = getAuth();
  const categoryService = useCategoryService();
  const playlistService = usePlaylistService();

  const sortSongs = useCallback((songsToSort: SongView[]): SongView[] => {
    return [...songsToSort].sort((a, b) => {
      const titleComparison = a.title
        .toLowerCase()
        .localeCompare(b.title.toLowerCase());
      return titleComparison === 0
        ? a.artist.toLowerCase().localeCompare(b.artist.toLowerCase())
        : titleComparison;
    });
  }, []);

  const loadPlaylistSongs = useCallback(async () => {
    try {
      const currentPlaylistSongs = await playlistService.getPlaylistSongs(
        playlistId,
      );
      setPlaylistSongs(new Set(currentPlaylistSongs.map(song => song.id)));
    } catch (error) {
      console.error('Failed to fetch playlist songs:', error);
    }
  }, [playlistId, playlistService]);

  const loadSongs = useCallback(async () => {
    if (!auth.currentUser?.uid) return;

    setIsLoading(true);
    try {
      await loadPlaylistSongs();
      const fetchedSongs = await categoryService.getAllSongsByUserId(
        auth.currentUser.uid,
      );
      const sortedSongs = sortSongs(fetchedSongs);
      setSongs(sortedSongs);
    } catch (error) {
      console.error('Failed to fetch songs:', error);
      Alert.alert('Error', 'Failed to load songs');
    } finally {
      setIsLoading(false);
    }
  }, [auth.currentUser?.uid, categoryService, sortSongs, loadPlaylistSongs]);

  useEffect(() => {
    if (isVisible) {
      loadSongs();
      setSelectedSongs(new Set()); // Reset selections when modal opens
    }
  }, [isVisible, loadSongs]);

  const handleSongSelection = (songId: string) => {
    if (playlistSongs.has(songId)) {
      return; // No permitir seleccionar canciones que ya están en la playlist
    }

    setSelectedSongs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(songId)) {
        newSet.delete(songId);
      } else {
        newSet.add(songId);
      }
      return newSet;
    });
  };

  const handleAddSelectedSongs = async () => {
    if (selectedSongs.size === 0) {
      Alert.alert('Selection Required', 'Please select at least one song');
      return;
    }

    setIsSubmitting(true);
    try {
      const selectedSongsData = songs
        .filter(song => selectedSongs.has(song.id))
        .map(song => ({
          id: song.id,
          title: song.title,
          artist: song.artist,
          categoryId: song.categoryId,
          isDone: song.isDone,
        }));

      await onAddSong(selectedSongsData);
      setSelectedSongs(new Set()); // Reset selections after successful addition
    } catch (error) {
      console.error('Failed to add songs:', error);
      Alert.alert('Error', 'Failed to add selected songs to playlist');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSongItem = ({item}: {item: SongView}) => {
    const isSelected = selectedSongs.has(item.id);
    const isInPlaylist = playlistSongs.has(item.id);

    return (
      <TouchableOpacity
        onPress={() => handleSongSelection(item.id)}
        disabled={isSubmitting || isInPlaylist}
        style={[
          styles.container,
          isSelected && styles.selectedContainer,
          isInPlaylist && styles.inPlaylistContainer,
        ]}>
        <Icon
          name={
            isSelected
              ? 'checkmark-circle'
              : isInPlaylist
              ? 'alert-circle'
              : 'musical-note'
          }
          size={24}
          color={
            isSelected
              ? globalColors.secondary
              : isInPlaylist
              ? globalColors.danger
              : globalColors.primary
          }
        />
        <View style={styles.songItemContent}>
          <Text
            style={[styles.songTitle, isInPlaylist && styles.inPlaylistText]}>
            {item.title}
          </Text>
          <Text
            style={[styles.artistName, isInPlaylist && styles.inPlaylistText]}>
            {item.artist}
          </Text>
          {isInPlaylist && (
            <Text style={styles.inPlaylistLabel}>Already in playlist</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.selectionCount}>
        {selectedSongs.size} songs selected
      </Text>
      {selectedSongs.size > 0 && (
        <TouchableOpacity
          onPress={() => setSelectedSongs(new Set())}
          style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear Selection</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="formSheet">
      <View style={styles.modalContainer}>
        <View style={styles.modalBtnContainer}>
          <Text style={styles.modalFormHeaderTitle}>Add Songs</Text>
          <PrimaryButton
            label="Close"
            btnFontSize={20}
            colorText={globalColors.light}
            onPress={onClose}
            disabled={isSubmitting}
          />
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={globalColors.primary} />
          </View>
        ) : songs.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon
              name="musical-notes"
              size={50}
              color={globalColors.terceary}
            />
            <Text style={styles.emptyStateText}>No songs available</Text>
            <Text style={styles.emptyStateSubText}>
              Create songs first to add them to your playlist
            </Text>
          </View>
        ) : (
          <>
            {renderHeader()}
            <FlatList
              data={songs}
              renderItem={renderSongItem}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              contentContainerStyle={styles.listContainer}
            />
            {selectedSongs.size > 0 && (
              <View style={styles.bottomContainer}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleAddSelectedSongs}
                  disabled={isSubmitting}>
                  <Icon
                    name="add-circle"
                    size={24}
                    color={globalColors.light}
                  />
                  <Text style={styles.addButtonText}>
                    {isSubmitting
                      ? 'Adding...'
                      : `Add ${selectedSongs.size} Songs`}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>
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
    paddingVertical: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: globalColors.terceary + '20',
  },
  selectionCount: {
    fontSize: 16,
    color: globalColors.primary,
    fontWeight: '500',
  },
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    color: globalColors.danger,
    fontSize: 14,
  },
  modalFormHeaderTitle: {
    fontSize: 20,
    color: globalColors.light,
  },
  listContainer: {
    flexGrow: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  selectedContainer: {
    backgroundColor: globalColors.primary + '10',
  },
  inPlaylistContainer: {
    backgroundColor: globalColors.danger + '05',
    opacity: 0.8,
  },
  songItemContent: {
    flex: 1,
    marginLeft: 12,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  artistName: {
    fontSize: 14,
    color: '#666',
  },
  inPlaylistText: {
    color: globalColors.terceary,
  },
  inPlaylistLabel: {
    fontSize: 12,
    color: globalColors.danger,
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: globalColors.terceary,
    opacity: 0.2,
  },
  bottomContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: globalColors.terceary + '20',
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addButton: {
    backgroundColor: globalColors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  addButtonText: {
    color: globalColors.light,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
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
