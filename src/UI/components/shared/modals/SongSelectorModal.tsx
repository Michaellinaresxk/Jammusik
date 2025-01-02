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
import {SongView} from '../../../../views/SongView';
import {PrimaryButton} from '../PrimaryButton';
// import { KeyboardGestureArea } from 'react-native-keyboard-controller';
import {ScrollView} from 'react-native-gesture-handler';

interface SongSelectorModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAddSong: (songData: SongView) => Promise<void>;
  playlistId: string;
}

export const SongSelectorModal: React.FC<SongSelectorModalProps> = ({
  isVisible,
  onClose,
  onAddSong,
}) => {
  const [songs, setSongs] = useState<SongView[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();
  const categoryService = useCategoryService();

  const loadSongs = useCallback(async () => {
    if (!auth.currentUser?.uid) return;

    setIsLoading(true);
    try {
      const fetchedSongs = await categoryService.getAllSongsByUserId(
        auth.currentUser.uid,
      );
      setSongs(fetchedSongs);
    } catch (error) {
      console.error('Failed to fetch songs:', error);
      Alert.alert('Error', 'Failed to load songs');
    } finally {
      setIsLoading(false);
    }
  }, [auth.currentUser?.uid, categoryService]);

  useEffect(() => {
    if (isVisible) {
      loadSongs();
    }
  }, [isVisible, loadSongs]);

  const handleSongSelection = async (song: SongView) => {
    setIsLoading(true);
    try {
      await onAddSong({
        id: song.id,
        title: song.title,
        artist: song.artist,
        categoryId: song.categoryId,
        isDone: song.isDone,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderSongItem = ({item}: {item: SongView}) => (
    <TouchableOpacity
      onPress={() => handleSongSelection(item)}
      disabled={isLoading}>
      <View style={styles.container}>
        <Icon name="musical-note" size={24} color={globalColors.primary} />
        <View style={styles.songItemContent}>
          <Text style={styles.songTitle}>{item.title}</Text>
          <Text style={styles.artistName}>{item.artist}</Text>
        </View>
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
      {/* <KeyboardGestureArea interpolator="ios" style={{flex: 1}}> */}
      <ScrollView horizontal={false} style={{flex: 1}}>
        <View style={styles.modalBtnContainer}>
          <Text style={styles.modalFormHeaderTitle}>Add Songs</Text>
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
          <FlatList
            data={songs}
            renderItem={renderSongItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </ScrollView>
      {/* </KeyboardGestureArea> */}
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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  songItemContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  songTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#000',
  },
  artistName: {
    fontSize: 14,
    color: '#666',
  },
  addIcon: {
    marginLeft: 'auto',
    paddingLeft: 12,
  },
});
