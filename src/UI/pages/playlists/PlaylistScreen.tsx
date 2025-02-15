import React, {useCallback, useRef} from 'react';
import {
  Animated,
  Easing,
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
import Icon from 'react-native-vector-icons/Ionicons';
import {globalColors} from '../../theme/Theme';
import {type NavigationProp, useNavigation} from '@react-navigation/native';
import {PlaylistCard} from '../../components/shared/cards/PlaylistCard';
import {TheGreenBorder} from '../../components/shared/TheGreenBorder';
import {PrimaryButton} from '../../components/shared/PrimaryButton';
import {usePlaylistService} from '../../../context/PlaylistServiceContext';
import {useEffect, useState} from 'react';
import {PlaylistView} from '../../../views/PlaylistView';
import {getAuth} from 'firebase/auth';
import {FormCreatePlaylist} from '../../components/shared/forms/FormCreatePlaylist';
import {Separator} from '../../components/shared/Separator';
import {usePullRefresh} from '../../../hooks/usePullRefresing';
import Toast from 'react-native-toast-message';
import {useUpdatePlaylist} from '../../../hooks/useUpdatePlaylist';
import {RootStackParamsList} from '../../routes/AppNavigator';
import {SharePlaylistModal} from '../../components/shared/modals/SharedPlaylistModal';
import {AnimatedSharedButton} from '../../components/shared/animated/AnimatedSharedButton';

export const PlaylistScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

  const auth = getAuth();
  const playlistService = usePlaylistService();
  const [playlists, setPlaylists] = useState<PlaylistView[]>([]);
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const [isShareModalVisible, setIsShareModalVisible] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');

  const {updatePlaylist, isLoading: isUpdating} = useUpdatePlaylist();
  const [editingPlaylist, setEditingPlaylist] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const [hasSharedPlaylists, setHasSharedPlaylists] = useState(false);

  const musicIconScale = useRef(new Animated.Value(1)).current;

  // Animation for the music icon
  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(musicIconScale, {
          toValue: 1.2,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(musicIconScale, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, []);

  const checkSharedPlaylists = useCallback(async () => {
    if (!auth.currentUser) return;

    try {
      const playlists = await playlistService.getSharedPlaylists(
        auth.currentUser.uid,
      );
      setHasSharedPlaylists(playlists.length > 0);
    } catch (error) {
      console.error('Error checking shared playlists:', error);
    }
  }, [auth.currentUser, playlistService]);

  // Add effect to check periodically
  useEffect(() => {
    checkSharedPlaylists();
    const interval = setInterval(checkSharedPlaylists, 30000);

    return () => clearInterval(interval);
  }, [checkSharedPlaylists]);

  const loadPlaylists = useCallback(async () => {
    const user = auth.currentUser;
    const userId = user?.uid as string;
    try {
      const fetchedPlaylists = await playlistService.getPlaylists(userId);
      // Sort by creation date, newest first
      const sortedPlaylists = fetchedPlaylists.sort((a, b) => {
        const dateA =
          a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
        const dateB =
          b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
      setPlaylists(sortedPlaylists);
    } catch (error) {
      console.error('Failed to fetch playlists:', error);
    }
  }, [auth.currentUser, playlistService]);

  const handleCreatePlaylist = async (values: any) => {
    const {title} = values;
    setIsLoading(true);
    try {
      const newPlaylist = await playlistService.createPlaylist(title);

      // Update the playlists list with the new playlist at the top
      setPlaylists(prevPlaylists => {
        const updatedPlaylists = [
          {
            ...newPlaylist,
            createdAt: new Date(), // Ensure we have a Date object
          },
          ...prevPlaylists,
        ];
        // Sort again to ensure consistency
        return updatedPlaylists.sort((a, b) => {
          const dateA =
            a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
          const dateB =
            b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        });
      });

      setTitle('');
      closeModal();

      Toast.show({
        type: 'success',
        text1: 'Playlist created successfully',
        text2: 'Your new playlist is at the top of the list',
      });
    } catch (error) {
      console.error('Failed to create playlist:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to create playlist',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Load playlist when the component mounts
    loadPlaylists().then(() => {
      console.log('Playlists loaded:', playlists.length);
    });
  }, [loadPlaylists, playlists.length]);

  useEffect(() => {
    //  Load playlist when triggerUpdate changes
    if (triggerUpdate) {
      loadPlaylists();
      setTriggerUpdate(false);
    }
  }, [triggerUpdate, loadPlaylists]);

  const closeModal = () => {
    setIsVisible(!isVisible);
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Playlist Deleted successfully. 👋',
    });
  };

  const handleUpdatePlaylist = async (values: {title: string}) => {
    if (editingPlaylist) {
      await updatePlaylist(editingPlaylist.id, values.title, setPlaylists);
      setEditingPlaylist(null);
      setTitle('');
      setIsVisible(false);
    }
  };

  const startEditingPlaylist = (playlist: {id: string; title: string}) => {
    setEditingPlaylist(playlist);
    setTitle(playlist.title);
    setIsVisible(true);
  };

  const handleDeletePlaylist = async (playlistId: string) => {
    await playlistService.deletePlaylist(playlistId);
    setTriggerUpdate(true);
    showToast();
  };

  const handleSharePlaylist = (playlistId: string) => {
    setSelectedPlaylistId(playlistId);
    setIsShareModalVisible(true);
  };

  const handleSubmitShare = async () => {
    try {
      await playlistService.sharePlaylist(selectedPlaylistId, recipientEmail);
      setIsShareModalVisible(false);
      setRecipientEmail('');
      Toast.show({
        type: 'success',
        text1: 'Playlist shared successfully',
      });
      // 🚀 Update status of shared playlists immediately
      await checkSharedPlaylists();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to share playlist',
      });
    }
  };

  const {isRefreshing, refresh, top} = usePullRefresh(loadPlaylists);

  return (
    <>
      <TheGreenBorder />
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
          }
          showsVerticalScrollIndicator={false} // Hides the scroll bar
          decelerationRate="normal" // Controls the deceleration speed
          scrollEventThrottle={16} // Improves softness
          bounces={true} // Bounce-back effect at the limits
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 150, // Unifica el padding bottom
          }}
          overScrollMode="never" // Avoid the over-scroll effect in Android.
        >
          <View
            style={{
              flex: 1,
              paddingHorizontal: 15,
              marginTop: 40,
            }}>
            <View style={styles.containerHeader}>
              <View style={styles.titleContent}>
                <Animated.View style={{transform: [{scale: musicIconScale}]}}>
                  <Icon
                    name="musical-notes-sharp"
                    color={globalColors.primary}
                    size={30}
                  />
                </Animated.View>
                <Text style={styles.title}>Create New Playlist</Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsVisible(true)}
                style={styles.openModalBtn}>
                <Text style={styles.openModalBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Separator color={globalColors.terceary} />
          <View style={styles.sharedButtonContainer}>
            <AnimatedSharedButton
              navigation={navigation}
              hasSharedPlaylists={hasSharedPlaylists}
              style={styles.sharedButton}
              buttonTextStyle={styles.sharedButtonText}
            />
          </View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Playlists</Text>
          </View>
          <View style={{marginBottom: 150}}>
            <FlatList
              data={playlists}
              keyExtractor={item => item.id}
              numColumns={2}
              renderItem={({item, index}) => (
                <View style={styles.playlistCardContainer}>
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
                    onShare={() => handleSharePlaylist(item.id)}
                    onDelete={() => handleDeletePlaylist(item.id)}
                  />
                </View>
              )}
            />
          </View>
          <View style={{marginBottom: 150}}></View>
          <Modal
            visible={isVisible}
            animationType="slide"
            presentationStyle="pageSheet">
            <View style={styles.modalBtnContainer}>
              <Text style={styles.modalFormHeaderTitle}>
                {editingPlaylist ? 'Edit Playlist' : 'Add Playlist'}
              </Text>
              <PrimaryButton
                label="Close"
                btnFontSize={20}
                colorText={globalColors.light}
                onPress={() => {
                  closeModal();
                  setEditingPlaylist(null);
                }}
              />
            </View>
            <FormCreatePlaylist
              title={title}
              setTitle={setTitle}
              onCreatePlaylist={
                editingPlaylist ? handleUpdatePlaylist : handleCreatePlaylist
              }
              isLoading={isLoading}
              isEditing={!!editingPlaylist}
              playlistId={editingPlaylist?.id}
            />
          </Modal>
          <SharePlaylistModal
            visible={isShareModalVisible}
            onClose={() => setIsShareModalVisible(false)}
            playlistId={selectedPlaylistId}
            recipientEmail={recipientEmail}
            setRecipientEmail={setRecipientEmail}
            onSubmit={handleSubmitShare}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 20,
    paddingHorizontal: 30,
  },
  sectionTitle: {
    fontSize: 18,
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
  playlistCardContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    padding: 30,
  },
  modalBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: globalColors.primary,
    paddingLeft: 22,
    paddingRight: 20,
  },
  modalFormHeaderTitle: {
    fontSize: 20,
    color: globalColors.light,
  },

  sharedButtonContainer: {
    padding: 20,
  },

  sharedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: globalColors.primaryAlt,
    borderRadius: 8,
    marginVertical: 10,
  },
  sharedButtonText: {
    color: globalColors.primary,
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
  },
});
