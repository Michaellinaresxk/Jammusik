import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  Linking,
  Pressable,
  ActivityIndicator,
  Image,
  Animated,
  Easing,
} from 'react-native';
import {GlobalHeader} from '../../components/shared/GlobalHeader';
import {FloatingActionButton} from '../../components/shared/FloatingActionButton';
import {useRoute} from '@react-navigation/native';
import {Text} from 'react-native';
import {PrimaryIcon} from '../../components/shared/PrimaryIcon';
import {globalColors} from '../../theme/Theme';
import {usePullRefresh} from '../../../hooks/usePullRefresing';
import {PrimaryButton} from '../../components/shared/PrimaryButton';
import {FormSongDetails} from '../../components/shared/forms/FormSongDetails';
import Toast from 'react-native-toast-message';
import {auth} from '../../../infra/api/firebaseConfig';
import {useSongDetailsService} from '../../../context/SongDetailsServiceContext';
import {SongDetailsView} from '../../../views/SongDetailsView';
import {useGetCategoryTitle} from '../../../hooks/useGetCategoryTitle';
import {LyricsView} from '../../components/shared/LyricsView';
import {useTrackInfo} from '../../../hooks/useTrackInfo';
import {useTabFinder} from '../../../hooks/useTabFinder';
import {ChordModal} from '../../components/shared/modals/ChordModal';
import {useUpdateSongDetails} from '../../../hooks/useUpdateSongDetails';
import {SliderQuotes} from '../../components/shared/SliderQuotes';
import {ChordDisplay} from '../../components/shared/ChordDisplay';
import {LinearGradient} from 'react-native-linear-gradient';
import {ChordGeneratorModal} from '../../components/shared/modals/ChordGeneratorModal';
// import LinearGradient from 'react-native-svg/lib/typescript/elements/LinearGradient';
export const SongSelectedScreen = () => {
  const params = useRoute().params;
  const [isVisible, setIsVisible] = useState(false);
  const [songDetails, setSongDetails] = useState<SongDetailsView[]>();
  const [songKey, setSongKey] = useState('');
  const [chordList, setChordList] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [lyricLink, setLyricLink] = useState('');
  const [tabLink, setTabLink] = useState('');
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [hasSavedData, setHasSavedData] = useState(false);
  const [category, setCategory] = useState('');
  const [editingSongDetails, setEditingSongDetails] = useState(null);
  const userId = auth.currentUser ? auth.currentUser.uid : '';
  const songId = params.songId;
  const categoryId = params.categoryId;
  const songDetailsService = useSongDetailsService();

  const [isLyricsModalVisible, setIsLyricsModalVisible] = useState(false);
  const [hasLyrics, setHasLyrics] = useState(false);

  const [isChordModalVisible, setIsChordModalVisible] = useState(false);
  const [isGeneratorModalVisible, setIsGeneratorModalVisible] = useState(false);
  const [chordData, setChordData] = useState(null);

  const {findTab, loading: tabLoading} = useTabFinder();
  const [tabUrls, setTabUrls] = useState(null);

  const [loading, setLoading] = useState(false);

  const {
    trackInfo,
    loading: loadingTrackInfo,
    error: trackError,
    fetchTrackInfo,
  } = useTrackInfo();

  const {
    updateSongDetails,
    loadCurrentDetails,
    currentDetails,
    clearCurrentDetails,
    isLoading,
  } = useUpdateSongDetails();

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

  const handleFindTabs = async () => {
    try {
      const searchUrls = {
        ultimateGuitar: `https://www.ultimate-guitar.com/search.php?search_type=title&value=${encodeURIComponent(
          params.title,
        )}+${encodeURIComponent(params.artist)}`,
        songsterr: `https://www.songsterr.com/a/wa/search?pattern=${encodeURIComponent(
          params.title,
        )}+${encodeURIComponent(params.artist)}`,
        echords: `https://www.e-chords.com/search?q=${encodeURIComponent(
          params.title,
        )}+${encodeURIComponent(params.artist)}`,
      };

      Alert.alert('Available Tabs', 'Select where you want to find the tabs:', [
        {
          text: 'Ultimate Guitar',
          onPress: () => {
            console.log('Opening Ultimate Guitar:', searchUrls.ultimateGuitar);
            handleOpenLink(searchUrls.ultimateGuitar);
          },
        },
        {
          text: 'Songsterr',
          onPress: () => handleOpenLink(searchUrls.songsterr),
        },
        {
          text: 'E-Chords',
          onPress: () => handleOpenLink(searchUrls.echords),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]);
    } catch (error) {
      console.error('Error in handleFindTabs:', error);
      Alert.alert('Error', 'Failed to generate tab URLs');
    }
  };

  const handleChordsGenerated = data => {
    setChordData(data);
  };

  // Fetch track info when component mounts
  useEffect(() => {
    const loadTrackInfo = async () => {
      if (params.title && params.artist) {
        setLoading(true);
        try {
          const info = await fetchTrackInfo(params.title, params.artist);

          // Check if the information retrieved matches what we are looking for.
          if (
            info &&
            (!info.name.toLowerCase().includes(params.title.toLowerCase()) ||
              !info.artist.toLowerCase().includes(params.artist.toLowerCase()))
          ) {
            setError('Unable to find exact match for this song');
          }
        } catch (error) {
          setError('Error loading track information');
          console.error('Track info error:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadTrackInfo();
  }, [params.title, params.artist, fetchTrackInfo]);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Updated song Info successfully!',
    });
  };
  const handleCreateSongDetails = async (details: {
    songKey: string;
    chordList: string[];
    notes: string;
    lyricLink: string;
    tabLink: string;
  }) => {
    try {
      await songDetailsService.setSongDetails(
        userId,
        songId,
        details.songKey,
        details.chordList,
        details.notes,
        details.lyricLink,
        details.tabLink,
      );

      showToast();
      handleCloseModal();
      await loadSongDetails();
      setHasSavedData(true);
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to save song details',
      });
    }
  };
  const loadSongDetails = useCallback(async () => {
    if (!userId || !songId) {
      console.error('userId or songId is undefined or empty!');
      return;
    }
    try {
      const fetchedSongDetails = await songDetailsService.getSongDetails(
        userId,
        songId,
      );
      if (fetchedSongDetails) {
        setSongDetails(fetchedSongDetails);
        setSongKey(fetchedSongDetails.key || '');
        setChordList(fetchedSongDetails.chordList || []);
        setNotes(fetchedSongDetails.notes || '');
        setLyricLink(fetchedSongDetails.lyricLink || '');
        setTabLink(fetchedSongDetails.tabLink || '');
        setHasSavedData(true);
      } else {
        setSongDetails(null);
        setSongKey('');
        setChordList([]);
        setNotes('');
        setLyricLink('');
        setTabLink('');
      }
    } catch (error) {
      if (hasSavedData) {
        console.error('Failed to fetch songDetails:', error);
        Alert.alert('Error', 'Failed to fetch song details.');
      }
    }
  }, [userId, songId, songDetailsService, hasSavedData]);
  useEffect(() => {
    loadSongDetails();
  }, [loadSongDetails]);
  useEffect(() => {
    if (triggerUpdate) {
      loadSongDetails();
      setTriggerUpdate(false);
    }
  }, [triggerUpdate, loadSongDetails]);

  useEffect(() => {
    const getCategoryTitle = async () => {
      try {
        const categoryTitle = await useGetCategoryTitle(categoryId);
        setCategory(categoryTitle);
      } catch (error) {
        console.error('Error fetching category title:', error);
        Alert.alert('Error', 'Failed to fetch category title.');
      }
    };

    if (categoryId) {
      getCategoryTitle();
    }
  }, [categoryId]);

  const handleOpenLink = useCallback(async url => {
    if (!url) {
      console.log('No URL provided');
      return;
    }

    try {
      console.log('Attempting to open URL:', url);
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', `Cannot open this URL: ${url}`);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
      Alert.alert('Error', 'Failed to open the link');
    }
  }, []);

  const handleOpenModal = useCallback(async () => {
    if (!userId || !songId) return;

    await loadCurrentDetails(userId, songId);
    setIsVisible(true);
  }, [userId, songId, loadCurrentDetails]);

  const handleCloseModal = useCallback(() => {
    setIsVisible(false);
    clearCurrentDetails();
  }, [clearCurrentDetails]);

  const handleUpdateSongDetails = async (formData: {
    songKey: string;
    chordList: string[];
    notes: string;
    lyricLink: string;
    tabLink: string;
  }) => {
    if (!userId || !songId) return;

    try {
      if (currentDetails) {
        await updateSongDetails(
          userId,
          songId,
          {
            key: formData.songKey,
            chordList: formData.chordList,
            notes: formData.notes,
            lyricLink: formData.lyricLink,
            tabLink: formData.tabLink,
          },
          setSongDetails,
          () => {
            handleCloseModal();
            loadSongDetails();
          },
        );
      } else {
        await handleCreateSongDetails(formData);
      }
    } catch (error) {
      console.error('Error handling song details:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to save changes',
      });
    }
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const {isRefreshing, refresh, top} = usePullRefresh(loadSongDetails);

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
          }
          showsVerticalScrollIndicator={false} // Hides the scroll bar
          decelerationRate="normal" // Controls the deceleration speed
          scrollEventThrottle={16} // Improves softness
          bounces={true} // Bounce-back effect at the limits
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 150,
          }}
          overScrollMode="never" // Avoid the over-scroll effect in Android.
        >
          <View>
            <GlobalHeader headerTitle={params.title} artist={params.artist} />
            <FloatingActionButton onPress={() => handleOpenModal(true)} />
          </View>
          <View style={styles.layout}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Category:</Text>
              <View style={styles.titleContent}>
                <PrimaryIcon
                  name="musical-notes-sharp"
                  size={22}
                  color={globalColors.primary}
                />
                <Text style={styles.category}>
                  {category || params.categoryId || 'Unknown'}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.title}>Key:</Text>
              <View style={styles.titleContent}>
                <Text style={styles.category}>{songKey}</Text>
              </View>
            </View>
          </View>
          {loadingTrackInfo ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={globalColors.primary} />
            </View>
          ) : trackError ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Failed to load track info</Text>
            </View>
          ) : (
            trackInfo && (
              <View style={styles.trackInfoContent}>
                {/* Album Image */}
                {trackInfo.album.image && (
                  <View style={styles.albumImageContainer}>
                    <Image
                      source={{uri: trackInfo.album.image}}
                      style={styles.albumImage}
                      resizeMode="cover"
                    />
                  </View>
                )}
                <View style={styles.trackInfoTitleWrapper}>
                  <Text style={styles.title}>Album:</Text>
                  <Text style={[styles.trackInfoText, {flexWrap: 'wrap'}]}>
                    {trackInfo.album.name}
                  </Text>
                </View>

                <View style={styles.trackInfoTitleWrapper}>
                  <Text style={styles.title}>Release Date:</Text>
                  <Text style={styles.trackInfoText}>
                    {trackInfo.album.release_date}
                  </Text>
                </View>
                {/* Preview Track Button */}
                {trackInfo.preview_url && (
                  <PrimaryButton
                    label="Preview Track"
                    onPress={() => handleOpenLink(trackInfo.preview_url)}
                    btnFontSize={18}
                    colorText={globalColors.light}
                    bgColor={globalColors.primary}
                    borderRadius={5}
                  />
                )}

                {/* Spotify Link Button */}
                {trackInfo.external_url && (
                  <View style={styles.spotifyButtonContainer}>
                    <Pressable
                      onPress={() => {
                        Alert.alert(
                          '🎵 Open in Spotify',
                          `Do you want to listen to "${trackInfo.name}" on Spotify?`,
                          [
                            {
                              text: 'Cancel',
                              style: 'cancel',
                            },
                            {
                              text: 'Open',
                              onPress: async () => {
                                try {
                                  const supported = await Linking.canOpenURL(
                                    trackInfo.external_url,
                                  );
                                  if (supported) {
                                    await Linking.openURL(
                                      trackInfo.external_url,
                                    );
                                  } else {
                                    Alert.alert(
                                      'Error',
                                      'Unable to open Spotify on this device',
                                    );
                                  }
                                } catch (error) {
                                  Alert.alert(
                                    'Error',
                                    'An error occurred while trying to open Spotify',
                                  );
                                }
                              },
                            },
                          ],
                        );
                      }}
                      style={({pressed}) => [
                        styles.spotifyButton,
                        pressed && styles.spotifyButtonPressed,
                      ]}>
                      <Animated.View
                        style={{transform: [{scale: musicIconScale}]}}>
                        <PrimaryIcon
                          name="play-circle-sharp"
                          color={globalColors.primary}
                          size={30}
                        />
                      </Animated.View>
                      <Text style={styles.spotifyButtonText}>
                        Open in Spotify
                      </Text>
                    </Pressable>
                  </View>
                )}
              </View>
            )
          )}

          {notes && (
            <View style={styles.notesContent}>
              <Text style={styles.title}>Notes:</Text>
              <Text style={{...styles.category, marginTop: 10}}>{notes}</Text>
            </View>
          )}

          <View style={styles.toolsSection}>
            <Text style={styles.title}>Tools</Text>
            <View style={styles.toolsGrid}>
              <Pressable
                style={({pressed}) => [
                  styles.toolCard,
                  pressed && styles.toolCardPressed,
                ]}
                onPress={() => setIsLyricsModalVisible(true)}>
                <View style={styles.toolIconContainer}>
                  <PrimaryIcon
                    name="text"
                    size={24}
                    color={globalColors.primaryDark}
                  />
                </View>
                <Text style={styles.toolText}>
                  {hasLyrics ? 'View Lyrics' : 'Generate Lyrics'}
                </Text>
                <Text style={styles.toolSubText}>
                  {hasLyrics ? 'See saved lyrics' : 'Create new lyrics'}
                </Text>
              </Pressable>

              <Pressable
                style={({pressed}) => [
                  styles.toolCard,
                  pressed && styles.toolCardPressed,
                ]}
                onPress={handleFindTabs}>
                <View style={styles.toolIconContainer}>
                  <PrimaryIcon
                    name="document-text"
                    size={24}
                    color={globalColors.primaryDark}
                  />
                </View>
                <Text style={styles.toolText}>Find Tabs</Text>
                <Text style={styles.toolSubText}>
                  Search online tab sources
                </Text>
              </Pressable>

              <Pressable
                style={({pressed}) => [
                  styles.toolCard,
                  pressed && styles.toolCardPressed,
                ]}
                onPress={() => setIsChordModalVisible(true)}>
                <View style={styles.toolIconContainer}>
                  <PrimaryIcon
                    name="musical-notes"
                    size={24}
                    color={globalColors.primaryDark}
                  />
                </View>
                <Text style={styles.toolText}>View Chords</Text>
                <Text style={styles.toolSubText}>See chord progression</Text>
              </Pressable>

              {tabLink && (
                <Pressable
                  style={({pressed}) => [
                    styles.toolCard,
                    pressed && styles.toolCardPressed,
                  ]}
                  onPress={() => handleOpenLink(tabLink)}>
                  <View style={styles.toolIconContainer}>
                    <PrimaryIcon
                      name="bookmark"
                      size={24}
                      color={globalColors.primary}
                    />
                  </View>
                  <Text style={styles.toolText}>Saved Tab</Text>
                  <Text style={styles.toolSubText}>Open your saved tab</Text>
                </Pressable>
              )}
            </View>
          </View>

          <View style={styles.aiGeneratorContainer}>
            <Pressable
              style={({pressed}) => [
                styles.aiGeneratorButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => setIsGeneratorModalVisible(true)}>
              <View style={styles.iconContainer}>
                <PrimaryIcon
                  name="musical-notes"
                  size={24}
                  color={globalColors.primaryDark}
                />
              </View>
              <Text style={styles.aiGeneratorText}>Generate Chords</Text>
              <Text style={styles.aiGeneratorSubText}>
                AI Chord Suggestions
              </Text>
            </Pressable>
          </View>
          {chordData && (
            <View>
              <Text>Debug: Chord data received</Text>
              <Text>{JSON.stringify(chordData, null, 2)}</Text>
            </View>
          )}

          <ChordDisplay chordData={chordData} />

          <SliderQuotes />
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        visible={isVisible}
        animationType="slide"
        presentationStyle="formSheet"
        onDismiss={handleCloseModal}>
        <View style={styles.modalBtnContainer}>
          <Text style={styles.modalFormHeaderTitle}>
            {currentDetails ? 'Edit Song Details' : 'Add Song Details'}
          </Text>
          <PrimaryButton
            label="Close"
            btnFontSize={20}
            colorText={globalColors.light}
            onPress={handleCloseModal}
          />
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={globalColors.primary} />
          </View>
        ) : (
          <>
            {/* Show current details */}
            {currentDetails && (
              <View style={styles.currentInfoContainer}>
                <Text style={styles.currentInfoTitle}>
                  Current Information:
                </Text>
                <View style={styles.currentInfoContent}>
                  <Text>Key: {currentDetails.key || 'Not set'}</Text>
                  {currentDetails.chordList?.length > 0 && (
                    <Text>Chords: {currentDetails.chordList.join(', ')}</Text>
                  )}
                  {currentDetails.notes && (
                    <Text>Notes: {currentDetails.notes}</Text>
                  )}
                </View>
              </View>
            )}

            <FormSongDetails
              songKey={currentDetails?.key || ''}
              chordList={currentDetails?.chordList || []}
              notes={currentDetails?.notes || ''}
              lyricLink={currentDetails?.lyricLink || ''}
              tabLink={currentDetails?.tabLink || ''}
              onCreateSongDetails={handleUpdateSongDetails}
              isEditing={!!currentDetails}
            />
          </>
        )}
      </Modal>
      {/* Modal of lyrics */}
      <Modal
        visible={isLyricsModalVisible}
        animationType="slide"
        onRequestClose={() => setIsLyricsModalVisible(false)}
        presentationStyle="fullScreen">
        <LyricsView
          artist={params.artist}
          title={params.title}
          onClose={() => {
            setIsLyricsModalVisible(false);
          }}
          onLyricsLoaded={success => setHasLyrics(success)}
        />
      </Modal>

      {/* Mantén el ChordModal original */}
      <ChordModal
        visible={isChordModalVisible}
        onClose={() => setIsChordModalVisible(false)}
        chordList={chordList}
        songKey={songKey}
        title={params.title}
        artist={params.artist}
      />

      <ChordGeneratorModal
        visible={isGeneratorModalVisible}
        onClose={() => {
          setIsGeneratorModalVisible(false);
          setChordData(null);
        }}
        title={params.title}
        artist={params.artist}
        chordData={chordData}
        onChordsGenerated={handleChordsGenerated}
      />
    </>
  );
};

const styles = StyleSheet.create({
  layout: {
    marginTop: 20,
    padding: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trackInfoTitleWrapper: {
    flexDirection: 'row',
    marginBottom: 5,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: 'bold',
    color: globalColors.primaryDark,
  },
  trackInfoText: {
    fontSize: 16,
    color: globalColors.primary,
    flex: 1,
    flexShrink: 1,
  },
  titleContainer: {},
  titleContent: {
    flexDirection: 'row',
    gap: 5,
    backgroundColor: globalColors.primaryAlt,
    padding: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 15,
  },
  chordLayout: {
    marginTop: 30,
    padding: 30,
    width: '100%',
  },
  chordConntent: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 15,
  },
  chord: {
    color: globalColors.primary,
    backgroundColor: globalColors.primaryAlt,
    fontSize: 15,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  category: {
    color: globalColors.primary,
    fontSize: 18,
  },
  notesContent: {
    backgroundColor: globalColors.primaryAlt,
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 10,
    padding: 30,
    width: '90%',
  },
  modalBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: globalColors.primary,
    paddingLeft: 22,
    paddingRight: 40,
  },
  modalFormHeaderTitle: {
    fontSize: 20,
    color: globalColors.light,
  },
  trackInfoContent: {
    marginTop: 15,
    gap: 10,
    padding: 30,
  },

  loadingContainer: {
    padding: 30,
    alignItems: 'center',
  },
  errorContainer: {
    padding: 30,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  albumImageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  albumImage: {
    width: '100%',
    height: '100%',
  },
  spotifyButtonContainer: {
    width: '100%',
    marginVertical: 10,
  },
  spotifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: globalColors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    gap: 10,
  },
  spotifyButtonPressed: {
    opacity: 0.8,
  },
  spotifyButtonText: {
    color: globalColors.light,
    fontSize: 18,
    fontWeight: '500',
  },

  toolsSection: {
    marginVertical: 20,
    padding: 20,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
    gap: 10,
  },
  toolCard: {
    width: 160,
    backgroundColor:
      Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.95)' : globalColors.light,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(230, 230, 230, 0.5)',
    elevation: Platform.OS === 'android' ? 3 : 0,
  },
  toolCardPressed: {
    transform: [{scale: 0.98}],
    backgroundColor:
      Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.9)' : globalColors.light,
  },
  toolIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: `${globalColors.primaryAlt}80`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  toolText: {
    fontSize: 15,
    color: globalColors.terceary,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
  toolSubText: {
    fontSize: 12,
    color: `${globalColors.terceary}90`,
    marginTop: 4,
    textAlign: 'center',
    marginBottom: 5,
  },

  chordGenerator: {
    marginTop: 20,
  },

  currentInfoContainer: {
    backgroundColor: globalColors.primaryAlt,
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  currentInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: globalColors.primaryDark,
    marginBottom: 8,
  },
  currentInfoContent: {
    gap: 8,
  },

  infoItem: {
    fontSize: 16,
    color: globalColors.primaryDark,
  },
  infoValue: {
    color: globalColors.primary,
    fontWeight: '500',
  },
  chordList: {
    marginTop: 8,
  },
  chordContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  chordTag: {
    backgroundColor: globalColors.primary,
    color: globalColors.light,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 14,
  },

  generatorContainer: {
    padding: 20,
    marginTop: 10,
  },
  gradientBorder: {
    borderRadius: 15,
    padding: 2,
  },
  generatorButton: {
    backgroundColor: globalColors.primary,
    borderRadius: 13,
    overflow: 'hidden',
  },
  generatorButtonPressed: {
    opacity: 0.9,
    transform: [{scale: 0.98}],
  },
  generatorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  generatorIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  generatorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: globalColors.light,
  },
  generatorSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  generatorTextContainer: {
    flex: 1,
    marginLeft: 15,
  },

  aiGeneratorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  aiGeneratorButton: {
    width: '100%',
    backgroundColor: globalColors.primaryAlt,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: globalColors.primary,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{scale: 0.98}],
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: globalColors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiGeneratorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: globalColors.primaryDark,
  },
  aiGeneratorSubText: {
    fontSize: 14,
    color: globalColors.primary,
    marginTop: 4,
  },
});
