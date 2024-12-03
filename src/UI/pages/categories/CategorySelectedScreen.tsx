import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamsList} from '../../routes/StackNavigator';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {getAuth} from 'firebase/auth';
import {Swipeable} from 'react-native-gesture-handler';
import {useCategoryService} from '../../../context/CategoryServiceContext';
import {useSongService} from '../../../context/SongServiceContext';
import {getIsDone} from '../../../hooks/useToggleIsDone';
import {SongCounter} from '../../components/shared/SongCounter';
import {usePullRefresh} from '../../../hooks/usePullRefresing';
import {SongView} from '../../../views/SongView';
import {globalColors} from '../../theme/Theme';
import {SongCard} from '../../components/shared/cards/SongCard';
import {GlobalHeader} from '../../components/shared/GlobalHeader';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';
import {useResetSongsState} from '../../store/useResetSongsState';

export const CategorySelectedScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  const params =
    useRoute<RouteProp<RootStackParamsList, 'CategoriesScreen'>>().params;
  const auth = getAuth();
  const userId = auth.currentUser?.uid as string;

  const categoryService = useCategoryService();
  const songService = useSongService();

  const [songList, setSongList] = useState<SongView[]>([]);

  const [isVisible, setIsVisible] = useState(false);
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [currentSongId, setCurrentSongId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const playlistId = params.id as string;
  const resetSongsState = useResetSongsState();

  const {resetToggle, resetAllSongs} = resetSongsState;

  const categoryAll = 'All';
  const categoryId = params.id as string;

  const valueWidth = useWindowDimensions().width;

  const loadSongList = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedSongs =
        categoryId === categoryAll
          ? await categoryService.getAllSongsByUserId(userId)
          : await categoryService.getSongListByCategory(userId, categoryId);

      const songsWithIsDone = await Promise.all(
        fetchedSongs.map(async song => ({
          ...song,
          isDone: await getIsDone(song.id),
        })),
      );

      setSongList(songsWithIsDone);
    } catch (error) {
      console.error('Failed to fetch song lists:', error);
    } finally {
      setIsLoading(false);
    }
  }, [categoryId, categoryService, userId]);

  useEffect(() => {
    loadSongList();
  }, [categoryId, userId, loadSongList]);

  useEffect(() => {
    if (triggerUpdate) {
      loadSongList();
      setTriggerUpdate(false);
    }
  }, [triggerUpdate, loadSongList]);

  const {isRefreshing, refresh, top} = usePullRefresh(loadSongList);

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
    try {
      if (songId) {
        await songService.deleteSong(userId, songId);
      }
      setTriggerUpdate(true);
      showToast();
    } catch (error) {
      console.error('Failed to delete song:', error);
      Alert.alert('Error', 'Failed to delete the song. Please try again.');
    }
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
      <Icon name="trash-sharp" size={25} style={styles.deleteIcon} />
    </TouchableOpacity>
  );

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
          <View>
            <GlobalHeader headerTitle={params.title} />
            <View style={styles.songCardContainer}>
              <SongCounter songCounter={songList.length} />
              <FlatList
                data={songList}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => {
                  return (
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
                              id: item.id,
                              title: item.title,
                              artist: item.artist,
                              categoryId: item.categoryId,
                            })
                          }
                        />
                      </View>
                    </Swipeable>
                  );
                }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  songCardContainer: {
    marginTop: 100,
    paddingHorizontal: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  bigTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '300',
    color: globalColors.terceary,
  },
  title: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: 'bold',
    color: globalColors.secondary,
    marginBottom: 20,
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
  modalBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: globalColors.primary,
    paddingLeft: 35,
  },
  modalFormHeaderTitle: {
    fontSize: 20,
    color: globalColors.light,
  },
  brandLogo: {
    marginBottom: 40,
    alignSelf: 'center',
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
