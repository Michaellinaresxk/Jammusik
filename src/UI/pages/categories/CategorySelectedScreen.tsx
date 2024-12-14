import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
import {FloatingActionButton} from '../../components/shared/FloatingActionButton';
import {KeyboardGestureArea} from 'react-native-keyboard-controller';
import {PrimaryButton} from '../../components/shared/PrimaryButton';
import {FormCreateSong} from '../../components/shared/forms/FormCreateSong';

export const CategorySelectedScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  const route = useRoute<RouteProp<RootStackParamsList, 'CategoriesScreen'>>();
  const auth = getAuth();
  const userId = auth.currentUser?.uid as string;

  // Services
  const categoryService = useCategoryService();
  const songService = useSongService();

  // Route params
  const {id: categoryId, title: categoryTitle} = route.params;
  const isAllCategory = categoryId === 'All';

  // States
  const [songList, setSongList] = useState<SongView[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const resetSongsState = useResetSongsState();
  const {resetToggle} = resetSongsState;

  // Create song handler
  const handleCreateSong = async (values: { title: string; artist: string; categoryId?: string }) => {
    try {
      setIsLoading(true);

      // If we are in “All”, use the category selected in the form.
      // If not, use the current category of the route
      const finalCategoryId = isAllCategory ? values.categoryId : categoryId;

      if (isAllCategory && !values.categoryId) {
        Alert.alert('Error', 'Please select a category');
        return;
      }

      const result = await songService.createSong(
        finalCategoryId!,
        values.title,
        values.artist,
        isDone
      );
  
      console.log('Song created:', result);
      await loadSongList();
      closeModal();
    } catch (error) {
      console.error('Failed to create song:', error);
      Alert.alert('Error', 'Failed to create the song. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Load songs list
  const loadSongList = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedSongs = isAllCategory
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
  }, [categoryId, isAllCategory, categoryService, userId]);

  // Effects
  useEffect(() => {
    loadSongList();
  }, [loadSongList]);

  // Handlers
  const closeModal = () => setIsVisible(false);
  const openModal = () => setIsVisible(true);

  const handleDeleteSong = async (songId: string) => {
    try {
      await songService.deleteSong(userId, songId);
      await loadSongList(); // Refresh list after deletion
      Toast.show({
        type: 'success',
        text1: 'Song Deleted successfully',
      });
    } catch (error) {
      console.error('Failed to delete song:', error);
      Alert.alert('Error', 'Failed to delete the song. Please try again.');
    }
  };

  const deleteConfirmation = (songId: string) =>
    Alert.alert('Are you sure?', 'Do you want to remove this song?', [
      {
        text: 'UPS! BY MISTAKE',
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
          <View>
            <GlobalHeader headerTitle={categoryTitle} />
            <FloatingActionButton onPress={openModal} />
            <View style={styles.songCardContainer}>
              <SongCounter songCounter={songList.length} />
              <FlatList
                data={songList}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => (
                  <Swipeable
                    renderRightActions={() => swipeRightActions(item.id)}>
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
                  </Swipeable>
                )}
              />
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
                onPress={closeModal}
              />
            </View>

            <FormCreateSong
              categoryId={categoryId}
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
