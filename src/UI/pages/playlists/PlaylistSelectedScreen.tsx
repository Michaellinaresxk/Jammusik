import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Modal,
  Text,
  TouchableOpacity,
  RefreshControl,
  useWindowDimensions,
  Animated,
} from 'react-native';
import {type NavigationProp, useNavigation} from '@react-navigation/native';
import {type RootStackParamsList} from '../../routes/StackNavigator';
import {RouteProp, useRoute} from '@react-navigation/native';
import {GlobalHeader} from '../../components/shared/GlobalHeader';
import {SongCard} from '../../components/shared/cards/SongCard';
import {globalColors} from '../../theme/Theme';
import {FloatingActionButton} from '../../components/shared/FloatingActionButton';
import {SongCounter} from '../../components/shared/SongCounter';
import {FormCreateSong} from '../../components/shared/forms/FormCreateSong';
import {useSongService} from '../../../context/SongServiceContext';
import {SongView} from '../../../views/SongView';
import {PrimaryButton} from '../../components/shared/PrimaryButton';
import {Swipeable} from 'react-native-gesture-handler';
// import Icon from "react-native-vector-icons/Ionicons";
import Toast from 'react-native-toast-message';
import {auth} from '../../../infra/api/firebaseConfig';
import {usePullRefresh} from '../../../hooks/usePullRefresing';
import {getIsDone} from '../../../hooks/useToggleIsDone';
import {useResetSongsState} from '../../store/useResetSongsState';
import useAnimationKeyboard from '../../../hooks/useAnimationKeyboard';

export const PlaylistSelectedScreen = () => {
  const songService = useSongService();
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  const params =
    useRoute<RouteProp<RootStackParamsList, 'PlaylistScreen'>>().params;
  const playlistId = params.id as string;
  const userId = auth.currentUser;

  const [categoryId, setCategoryId] = useState('');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [songList, setSongList] = useState<SongView[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [currentSongId, setCurrentSongId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const resetSongsState = useResetSongsState();
  const {resetToggle, resetAllSongs} = resetSongsState;
  const {KeyboardGestureArea, height, scale} = useAnimationKeyboard();

  const valueWidth = useWindowDimensions().width;

  const handleCreateSong = async values => {
    const {title, artist} = values;

    try {
      setIsLoading(true);
      await songService.createSong(
        categoryId,
        playlistId,
        title,
        artist,
        isDone,
      );
      setCategoryId('');
      setTitle('');
      setArtist('');
      setTriggerUpdate(true);
      setIsLoading(false);

      closeModal();
    } catch (error) {
      console.error('Failed to create song:', error);
      Alert.alert('Error', 'Failed to create the song. Please try again.');
    }
  };

  const loadSongList = useCallback(async () => {
    try {
      const fetchedSongs = await songService.getSongs(playlistId);
      const songsWithIsDone = await Promise.all(
        fetchedSongs.map(async song => ({
          ...song,
          isDone: await getIsDone(song.id),
        })),
      );
      setSongList(songsWithIsDone);
    } catch (error) {
      console.error('Failed to fetch songList:', error);
    }
  }, [playlistId, songService]);

  useEffect(() => {
    loadSongList();
  }, [loadSongList, resetToggle]);

  useEffect(() => {
    if (triggerUpdate) {
      loadSongList();
      setTriggerUpdate(false);
    }
  }, [triggerUpdate, loadSongList, resetToggle]);

  const closeModal = () => {
    setIsVisible(!isVisible);
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Song Deleted successfully',
    });
  };

  const handleDeleteSong = async (songId: string) => {
    await songService.deleteSong(userId, songId);
    setTriggerUpdate(true);
    showToast();
  };

  const deleteConfirmation = (songId: string) =>
    Alert.alert('Are you sure?', 'Do you want to remove this song?', [
      {
        text: 'UPS! BY MISTAKE',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'YES, DELETE!',
        onPress: () => handleDeleteSong(songId),
        style: 'destructive',
      },
    ]);

  const swipeRightActions = (songId: string) => (
    <TouchableOpacity
      style={styles.deleteButtonContent}
      onPress={() => deleteConfirmation(songId)}>
      {/* <Icon name="trash-sharp" size={25} style={styles.deleteIcon} /> */}
    </TouchableOpacity>
  );
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

          <FloatingActionButton onPress={() => setIsVisible(true)} />
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
                      categoryId={item.categoryId}
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

      <Modal
        visible={isVisible}
        animationType="slide"
        presentationStyle="formSheet">
        <KeyboardGestureArea interpolator="ios" style={{flex: 1}}>
          <ScrollView horizontal={false} style={{flex: 1}}>
            <View style={styles.modalBtnContainer}>
              <Text style={styles.modalFormHeaderTitle}>Add Song Info</Text>
              <PrimaryButton
                label="Close"
                btnFontSize={20}
                colorText={globalColors.light}
                onPress={() => closeModal()}
              />
            </View>

            <FormCreateSong
              title={title}
              setTitle={setTitle}
              artist={artist}
              setArtist={setArtist}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              onCreateSong={handleCreateSong}
              isLoading={isLoading}
            />
          </ScrollView>
        </KeyboardGestureArea>
      </Modal>
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
});
