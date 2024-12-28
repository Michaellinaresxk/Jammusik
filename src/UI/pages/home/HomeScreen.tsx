import React, {useState, useCallback} from 'react';
import {
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
import {CategoryCardLight} from '../../components/shared/cards/CategoryCardLight';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {GlobalHeader} from '../../components/shared/GlobalHeader';
import {globalColors} from '../../theme/Theme';
import {useCategoryService} from '../../../context/CategoryServiceContext';
import {CategoryView} from '../../../views/CategoryView';
import {usePlaylistService} from '../../../context/PlaylistServiceContext';
import {auth} from '../../../infra/api/firebaseConfig';
import {PlaylistView} from '../../../views/PlaylistView';
import {PlaylistCard} from '../../components/shared/cards/PlaylistCard';
import {SliderQuotes} from '../../components/shared/SliderQuotes';
import {usePullRefresh} from '../../../hooks/usePullRefresing';
import Toast from 'react-native-toast-message';
import {useUpdatePlaylist} from '../../../hooks/useUpdatePlaylist';
import {PrimaryButton} from '../../components/shared/PrimaryButton';
import {FormCreatePlaylist} from '../../components/shared/forms/FormCreatePlaylist';
import {useEnhancedOnboarding} from '../../../hooks/useEnhancedOnboarding';
import {OnboardingModal} from '../../components/shared/onBoarding/OnboardingModal';
import Icon from 'react-native-vector-icons/Ionicons';
import {Separator} from '../../components/shared/Separator';
import {useCreateSong} from '../../../hooks/useCreateSong';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const {
    isFirstLogin,
    currentStep,
    selectedGenres,
    handleGenreSelect,
    completeOnboarding,
    setCurrentStep,
    userName,
  } = useEnhancedOnboarding();

  const categoryService = useCategoryService();
  const playlistService = usePlaylistService();
  const [categories, setCategories] = useState<CategoryView[]>([]);
  const [playlists, setPlaylists] = useState<PlaylistView[]>([]);
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {updatePlaylist, isLoading: isUpdating} = useUpdatePlaylist();

  const [editingPlaylist, setEditingPlaylist] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [title, setTitle] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const loadData = useCallback(async () => {
    const user = auth.currentUser;
    const userId = user?.uid as string;

    try {
      const [fetchedCategories, fetchedPlaylists] = await Promise.all([
        categoryService.getCategories(userId),
        playlistService.getPlaylists(userId),
      ]);
      setCategories(fetchedCategories);
      setPlaylists(fetchedPlaylists);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }, [categoryService, playlistService]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData]),
  );

  // Create song funcionality
  const {CreateSongModal, openCreateSongModal} = useCreateSong({
    onSuccess: loadData,
  });

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Playlist Deleted successfully. 👋',
    });
  };

  const showUpdatedToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Playlist Updated successfully. 👋',
    });
  };

  const startEditingPlaylist = (playlist: {id: string; title: string}) => {
    setEditingPlaylist(playlist);
    setTitle(playlist.title);
    setIsVisible(true);
    showUpdatedToast();
  };

  const handleDeletePlaylist = async (playlistId: string) => {
    await playlistService.deletePlaylist(playlistId);
    setTriggerUpdate(prev => !prev); // Trigger the update
    showToast();
  };

  const {isRefreshing, refresh, top} = usePullRefresh(loadData);

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
            <GlobalHeader headerTitle="Home" hideBackButton={true} />
            {/* Add this section after the header */}
            <View style={styles.containerHeader}>
              <View style={styles.titleContent}>
                <Icon
                  name="musical-notes-sharp"
                  color={globalColors.primary}
                  size={30}
                />
                <Text style={styles.title}>Create new song!</Text>
              </View>
              <TouchableOpacity
                onPress={() => openCreateSongModal()}
                style={styles.openModalBtn}>
                <Text style={styles.openModalBtnText}>+</Text>
              </TouchableOpacity>
            </View>
            <Separator color={globalColors.terceary} />
            <View style={styles.categoryCardContainer}>
              <Text style={styles.subTitle}>My Music Categories:</Text>
              <FlatList
                ListHeaderComponent={
                  <CategoryCardLight
                    title="Library"
                    onPress={() =>
                      navigation.navigate('CategorySelectedScreen', {
                        id: 'Library',
                        title: 'Library',
                      })
                    }
                  />
                }
                data={categories}
                keyExtractor={item => item.id}
                horizontal={true}
                renderItem={({item}) => (
                  <CategoryCardLight
                    title={item.title}
                    onPress={() =>
                      navigation.navigate('CategorySelectedScreen', {
                        id: item.id,
                        title: item.title,
                      })
                    }
                  />
                )}
              />
              <View style={styles.playlistContainer}>
                <Text style={styles.subTitle}>My Playlists:</Text>
                <FlatList
                  data={playlists}
                  keyExtractor={item => item.id}
                  numColumns={2}
                  ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                      <Text style={styles.emptyMessage}>
                        No playlists created yet. Add one to organize your
                        songs!
                      </Text>
                      <TouchableOpacity
                        style={styles.createPlaylistButton}
                        onPress={() => {
                          console.log('Navigating to PlaylistScreen');
                          navigation.navigate('Playlists');
                        }}>
                        <Text style={styles.createPlaylistButtonText}>
                          + Create Playlist
                        </Text>
                      </TouchableOpacity>
                    </View>
                  }
                  renderItem={({item, index}) => (
                    <PlaylistCard
                      title={item.title}
                      color={
                        index % 2 === 0
                          ? globalColors.primary
                          : globalColors.secondary
                      }
                      onPress={() =>
                        navigation.navigate('PlaylistSelectedScreen', {
                          id: item.id,
                          title: item.title,
                        })
                      }
                      onEdit={() =>
                        startEditingPlaylist({id: item.id, title: item.title})
                      }
                      onDelete={() => handleDeletePlaylist(item.id)}
                    />
                  )}
                />
              </View>
              <SliderQuotes />
              <View style={{marginBottom: 100}}>
                <></>
              </View>
            </View>
          </View>
          <Modal
            visible={isVisible}
            animationType="slide"
            presentationStyle="formSheet">
            <View style={styles.modalBtnContainer}>
              <Text style={styles.modalFormHeaderTitle}>Edit Playlist</Text>
              <PrimaryButton
                label="Close"
                btnFontSize={20}
                colorText={globalColors.light}
                onPress={() => {
                  setIsVisible(false);
                  setEditingPlaylist(null);
                }}
              />
            </View>
            <FormCreatePlaylist
              title={title}
              setTitle={setTitle}
              onCreatePlaylist={async values => {
                if (editingPlaylist) {
                  await updatePlaylist(editingPlaylist.id, values.title);

                  // Update local state
                  setPlaylists(currentPlaylists =>
                    currentPlaylists.map(playlist =>
                      playlist.id === editingPlaylist.id
                        ? {...playlist, title: values.title}
                        : playlist,
                    ),
                  );

                  setEditingPlaylist(null);
                  setIsVisible(false);
                }
              }}
              isLoading={isLoading}
              isEditing={!!editingPlaylist}
              playlistId={editingPlaylist?.id}
            />
          </Modal>
          <OnboardingModal
            visible={isFirstLogin}
            userName={userName}
            selectedGenres={selectedGenres || []}
            handleGenreSelect={handleGenreSelect}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            completeOnboarding={completeOnboarding}
          />
          {/* Modal to create songs */}
          <CreateSongModal />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'red',
    fontSize: 30,
  },
  subTitle: {
    marginBottom: 5,
    fontSize: 18,
    color: globalColors.terceary,
  },
  categoryCardContainer: {
    padding: 30,
  },
  playlistContainer: {
    marginTop: 60,
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
  emptyContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  emptyMessage: {
    fontSize: 16,
    color: globalColors.terceary,
    textAlign: 'center',
    marginBottom: 10,
  },
  createPlaylistButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: globalColors.primary,
    alignItems: 'center',
  },
  createPlaylistButtonText: {
    color: globalColors.light,
    fontSize: 16,
    fontWeight: 'bold',
  },
  createSongSection: {
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  createSongButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: globalColors.primary,
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  createSongText: {
    color: globalColors.light,
    fontSize: 16,
    fontWeight: 'bold',
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  titleContent: {
    flexDirection: 'row',
    padding: 15,
    gap: 5,
    marginTop: 30,
    marginBottom: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: globalColors.primaryDark,
  },
  openModalBtn: {
    backgroundColor: globalColors.primaryAlt,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  openModalBtnText: {
    color: globalColors.primary,
    fontSize: 30,
    fontWeight: '300',
  },
});
