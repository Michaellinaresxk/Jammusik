import React, {useState, useCallback, useEffect} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
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
import {Welcome} from '../../components/shared/onBoarding/Welcome';
import {OnboardingTooltip} from '../../components/shared/onBoarding/OnboardingTooltip';
import {useOnboarding} from '../../../hooks/useOnboarding';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const {
    isFirstLogin,
    showTooltip,
    currentStep,
    steps,
    startOnboarding,
    nextStep,
    userName,
  } = useOnboarding();
  // useEffect for debugging
  useEffect(() => {
    console.log('Onboarding state:', {
      isFirstLogin,
      showTooltip,
      currentStep,
      userName,
    });
  }, [isFirstLogin, showTooltip, currentStep, userName]);

  console.log('user name in home', userName);

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
  console.log('Rendering HomeScreen with:', {
    isFirstLogin,
    showTooltip,
    currentStep,
    steps: steps?.[currentStep],
  });
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

            <View style={styles.categoryCardContainer}>
              <Text style={styles.subTitle}>My Categories:</Text>
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
              <SliderQuotes />
              <View style={styles.playlistContainer}>
                <Text style={styles.subTitle}>My Playlists:</Text>
                <FlatList
                  data={playlists}
                  keyExtractor={item => item.id}
                  numColumns={2}
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
        </ScrollView>
      </KeyboardAvoidingView>

      <Welcome
        visible={isFirstLogin}
        onStart={startOnboarding}
        userName={userName}
      />

      <OnboardingTooltip
        visible={showTooltip}
        title={steps[currentStep]?.title}
        description={steps[currentStep]?.description}
        position={steps[currentStep]?.position}
        onClose={nextStep}
      />
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
});
