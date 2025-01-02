import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Text,
  TouchableOpacity,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import {type NavigationProp, useNavigation} from '@react-navigation/native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {GlobalHeader} from '../../components/shared/GlobalHeader';
import {SongCard} from '../../components/shared/cards/SongCard';
import {globalColors} from '../../theme/Theme';
import {FloatingActionButton} from '../../components/shared/FloatingActionButton';
import {SongCounter} from '../../components/shared/SongCounter';
import {usePlaylistService} from '../../../context/PlaylistServiceContext';
import {SongView} from '../../../views/SongView';
import {Swipeable} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import {auth} from '../../../infra/api/firebaseConfig';
import {usePullRefresh} from '../../../hooks/usePullRefresing';
import {getIsDone} from '../../../hooks/useToggleIsDone';
import {useResetSongsState} from '../../../store/useResetSongsState';
// import useAnimationKeyboard from '../../../hooks/useAnimationKeyboard';
import {SongSelectorModal} from '../../components/shared/modals/SongSelectorModal';
import {SongOptionsModal} from '../../components/shared/modals/SongOptionsModal';
import {TabNavigatorParamsList} from '../../routes/TabNavigator';

export const PlaylistSelectedScreen = () => {
  const playlistService = usePlaylistService();
  const navigation = useNavigation<NavigationProp<TabNavigatorParamsList>>();
  const params =
    useRoute<RouteProp<TabNavigatorParamsList, 'Playlists'>>().params;
  const playlistId = params.id as string;

  const [songList, setSongList] = useState<SongView[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [currentSongId, setCurrentSongId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const resetSongsState = useResetSongsState();
  const {resetToggle, resetAllSongs} = resetSongsState;
  // const {height} = useAnimationKeyboard();
  const [isSongSelectorVisible, setIsSongSelectorVisible] = useState(false);

  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null);

  const valueWidth = useWindowDimensions().width;

  const handleAddSongToPlaylist = async (songData: SongView) => {
    try {
      await playlistService.addSongToPlaylist(playlistId, {
        id: songData.id,
        title: songData.title,
        artist: songData.artist,
        categoryId: songData.categoryId,
        originalSongId: songData.id,
      });

      Toast.show({
        type: 'success',
        text1: 'Song added to playlist successfully',
      });
      setIsSongSelectorVisible(false);
      loadSongList();
    } catch (error) {
      console.error('Failed to add song to playlist:', error);
      Alert.alert('Error', 'Failed to add song to playlist');
    }
  };

  const loadSongList = useCallback(async () => {
    try {
      console.log('Fetching songs...');
      const fetchedSongs = await playlistService.getPlaylistSongs(playlistId);
      console.log('Fetched songs:', fetchedSongs);
      const songsWithIsDone = await Promise.all(
        fetchedSongs.map(async song => ({
          ...song,
          isDone: await getIsDone(song.id),
        })),
      );
      setSongList(songsWithIsDone);
    } catch (error) {
      console.error('Failed to fetch songs from playlist:', error);
    }
  }, [playlistId, playlistService]);

  useEffect(() => {
    console.log('Loading songs for playlist:', playlistId);
    loadSongList();
  }, [loadSongList, playlistId, triggerUpdate]);

  const handleRemoveFromPlaylist = async (songId: string) => {
    const userId = auth.currentUser?.uid;

    if (!userId) {
      Alert.alert('Error', 'You must be logged in to remove songs');
      return;
    }

    try {
      setIsLoading(true);
      setSongList(prevSongs => prevSongs.filter(song => song.id !== songId));

      await playlistService.removeSongFromPlaylist(userId, playlistId, songId);

      Toast.show({
        type: 'success',
        text1: 'Song removed successfully',
      });
    } catch (error) {
      loadSongList();
      console.error('Error removing song:', error);
      Alert.alert('Error', 'Failed to remove song from playlist');
    } finally {
      setIsLoading(false);
    }
  };
  const handleResetSongs = async () => {
    try {
      setIsLoading(true);
      await resetAllSongs(playlistId);
      setIsDone(false);
      setTriggerUpdate(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Fallo al resetear las canciones:', error);
      Alert.alert(
        'Error',
        'Fallo al resetear las canciones. Por favor intente de nuevo.',
      );
      setIsLoading(false);
    }
  };

  const removeSongConfirmation = (songId: string) =>
    Alert.alert(
      'Remove Song',
      'Are you sure you want to remove this song from the playlist?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => handleRemoveFromPlaylist(songId),
        },
      ],
    );
  const swipeRightActions = (songId: string) => (
    <TouchableOpacity
      style={styles.editButtonContent}
      onPress={() => {
        setSelectedSongId(songId);
        setIsOptionsVisible(true);
      }}>
      <Icon
        name="ellipsis-vertical-sharp"
        size={25}
        style={styles.actionIcon}
      />
    </TouchableOpacity>
  );

  const {isRefreshing, refresh, top} = usePullRefresh(loadSongList);
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              progressViewOffset={top}
              colors={[
                globalColors.primary,
                globalColors.terceary,
                globalColors.primary,
              ]}
              onRefresh={refresh}
            />
          }>
          <GlobalHeader headerTitle={params.title} />

          <FloatingActionButton
            onPress={() => setIsSongSelectorVisible(true)}
          />
          <View style={styles.songCardContainer}>
            <SongCounter songCounter={songList.length} />
            <FlatList
              data={songList}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => (
                <Swipeable
                  renderRightActions={() => swipeRightActions(item.id)}
                  onSwipeableWillOpen={() => setCurrentSongId(item.id)}>
                  <View>
                    <SongCard
                      resetToggle={resetToggle}
                      title={item.title}
                      artist={item.artist}
                      isDone={item.isDone}
                      songId={item.id}
                      color={
                        index % 2 === 0
                          ? globalColors.primary
                          : globalColors.secondary
                      }
                      onPress={() =>
                        navigation.navigate('SongSelectedScreen', {
                          title: item.title,
                          artist: item.artist,
                          categoryId: item.categoryId,
                          songId: item.id,
                        })
                      }
                    />
                  </View>
                </Swipeable>
              )}
            />
            <View>
              <TouchableOpacity
                style={styles.resetBtn}
                onPress={handleResetSongs}>
                <Text style={styles.resetBtnText}>RESET SONGS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <SongSelectorModal
        isVisible={isSongSelectorVisible}
        onClose={() => setIsSongSelectorVisible(false)}
        onAddSong={handleAddSongToPlaylist}
        playlistId={playlistId}
      />

      <SongOptionsModal
        isVisible={isOptionsVisible}
        onClose={() => setIsOptionsVisible(false)}
        onRemoveSong={() => {
          if (selectedSongId) {
            setIsOptionsVisible(false);
            removeSongConfirmation(selectedSongId);
          }
        }}
        onToggleFavorite={() => {
          setIsOptionsVisible(false);
          Alert.alert(
            'Coming soon',
            'This functionality will be available soon',
          );
        }}
        songId={selectedSongId || ''}
        variant="playlist"
      />
    </>
  );
};

const styles = StyleSheet.create({
  songCardContainer: {
    marginTop: 100,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  modalBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: globalColors.primary,
    paddingLeft: 35,
    paddingRight: 25,
  },
  modalFormHeaderTitle: {
    fontSize: 20,
    color: globalColors.light,
  },
  resetBtn: {
    backgroundColor: globalColors.primaryAlt,
    padding: 10,
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 300,
    borderRadius: 5,
    width: '50%',
  },
  resetBtnText: {
    color: globalColors.primary,
  },
  deleteButtonContent: {
    backgroundColor: globalColors.danger,
    borderRadius: 10,
    height: 85,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    color: globalColors.light,
  },
  editButtonContent: {
    backgroundColor: globalColors.info,
    borderRadius: 10,
    height: 85,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    color: globalColors.light,
  },
});
