import React, {useCallback, useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  FlatList,
  Linking,
  Pressable,
  ActivityIndicator,
  Image,
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
// import {ChordGenerator} from '../../components/shared/ChordGenerator';
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

  const userId = auth.currentUser ? auth.currentUser.uid : '';
  const songId = params.songId;
  const categoryId = params.categoryId;
  const songDetailsService = useSongDetailsService();

  const [isLyricsModalVisible, setIsLyricsModalVisible] = useState(false);
  const [hasLyrics, setHasLyrics] = useState(false);

  const {findTab, loading: tabLoading} = useTabFinder();
  const [tabUrls, setTabUrls] = useState(null);

  const [loading, setLoading] = useState(false);

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

  // const handleChordsGenerated = chordData => {
  //   // Update status with new chords
  //   setChordList(chordData.chords);
  //   setSongKey(chordData.key);

  //   // Optional: save in the database
  //   onCreateSongDetails({
  //     songKey: chordData.key,
  //     chordList: chordData.chords,
  //     notes: `Generated with AI\nRecommended strumming: ${chordData.recommendations.strumming.join(
  //       ', ',
  //     )}\nCapo suggestion: Position ${chordData.recommendations.capo.position}`,
  //     lyricLink,
  //     tabLink,
  //   });
  // };

  const {
    trackInfo,
    loading: loadingTrackInfo,
    error: trackError,
    fetchTrackInfo,
  } = useTrackInfo();

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

  const closeModal = () => {
    setIsVisible(false);
  };
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Updated song Info successfully!',
    });
  };
  const onCreateSongDetails = async (details: {
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
      closeModal();
      setHasSavedData(true);
      setTriggerUpdate(true);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save song details. Please try again.');
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

  const {isRefreshing, refresh, top} = usePullRefresh(loadSongDetails);
  const renderChordItem = ({item}: {item: string}) => (
    <View style={styles.chordConntent}>
      <Text style={styles.chord}>{item}</Text>
    </View>
  );

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
            <GlobalHeader headerTitle={params.title} artist={params.artist} />
            <FloatingActionButton onPress={() => setIsVisible(true)} />
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
                  <Text style={styles.trackInfoText}>
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
                      <PrimaryIcon
                        name="play-circle-sharp"
                        size={30}
                        color={globalColors.primary}
                      />
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

          {chordList && chordList.length > 0 && (
            <View style={styles.chordLayout}>
              <Text style={styles.title}>Your Custom Chords:</Text>
              <FlatList
                data={chordList}
                renderItem={renderChordItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
              />
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
          {/*
          <View style={{padding: 30}}>
            <ChordGenerator
              title={params.title}
              artist={params.artist}
              onChordsGenerated={handleChordsGenerated}
              style={styles.chordGenerator}
            />
          </View> */}
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        visible={isVisible}
        animationType="slide"
        presentationStyle="formSheet"
        style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
          <View style={styles.modalBtnContainer}>
            <Text style={styles.modalFormHeaderTitle}>Add Song Details</Text>
            <PrimaryButton
              label="Close"
              btnFontSize={20}
              colorText={globalColors.light}
              onPress={() => closeModal()}
            />
          </View>
          <FormSongDetails
            songKey={songKey}
            setSongKey={setSongKey}
            chordList={chordList}
            setChordList={setChordList}
            notes={notes}
            setNotes={setNotes}
            lyricLink={lyricLink}
            setLyricLink={setLyricLink}
            tabLink={tabLink}
            setTabLink={setTabLink}
            onCreateSongDetails={onCreateSongDetails}
          />
        </ScrollView>
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
    marginBottom: 10,
  },
  titleContainer: {},
  title: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: 'bold',
    color: globalColors.primaryDark,
  },
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
  trackInfoText: {
    fontSize: 16,
    color: globalColors.primary,
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
    padding: 30,
  },
  toolsGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    marginTop: 15,
  },
  toolCard: {
    width: 160,
    backgroundColor:
      Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.95)' : globalColors.light,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
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
    borderRadius: 15,
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
  },

  chordGenerator: {
    marginTop: 20,
  },
});
