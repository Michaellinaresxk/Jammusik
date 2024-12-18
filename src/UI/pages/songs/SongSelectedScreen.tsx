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
  Animated,
  Linking,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {GlobalHeader} from '../../components/shared/GlobalHeader';
import {FloatingActionButton} from '../../components/shared/FloatingActionButton';
import {type RootStackParamsList} from '../../routes/StackNavigator';
import {RouteProp, useRoute} from '@react-navigation/native';
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
import {
  KeyboardGestureArea,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import useAnimationKeyboard from '../../../hooks/useAnimationKeyboard';
import BottomSheet from '../../components/shared/BottomSheets';
export const SongSelectedScreen = () => {
  const params =
    useRoute<RouteProp<RootStackParamsList, 'PlaylistSelectedScreen'>>().params;
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
  const {KeyboardGestureArea, height, scale} = useAnimationKeyboard();

  const closeModal = () => {
    setIsVisible(false);
  };
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Updated song Info successfully!',
    });
  };
  const onCreateSongDetails = async () => {
    try {
      if (!songKey) {
        Alert.alert('Error', 'Please select a song key');
        return;
      }
      await songDetailsService.setSongDetails(
        userId,
        songId,
        songKey,
        chordList,
        notes,
        lyricLink,
        tabLink,
      );
      showToast();
      closeModal();
      setHasSavedData(true);
      setTriggerUpdate(true);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create the song. Please try again.');
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

  const handleOpenLink = useCallback(async (url: string) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Unable to open URL: ${url}`);
    }
  }, []);

  const offset = {closed: 0, opened: 250};
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
          <View style={styles.notesContent}>
            <Text style={styles.title}>Notes:</Text>
            <Text style={{...styles.category, marginTop: 10}}>{notes}</Text>
          </View>
          <View style={styles.chordLayout}>
            <Text style={styles.title}>Chords:</Text>
            <FlatList
              data={chordList}
              renderItem={renderChordItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
            />
          </View>
          <View style={styles.linksContent}>
            <View style={{...styles.container, marginBottom: 30}}>
              <Text style={styles.title}>Lyric link:</Text>
              <Pressable onPress={() => handleOpenLink(lyricLink)}>
                <Text style={styles.links}>{lyricLink}</Text>
              </Pressable>
            </View>
            <View style={styles.container}>
              <Text style={styles.title}>Tab link:</Text>
              <Pressable onPress={() => handleOpenLink(tabLink)}>
                <Text style={styles.links}>{tabLink}</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        visible={isVisible}
        animationType="slide"
        presentationStyle="formSheet"
        style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
          <KeyboardStickyView offset={offset}>
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
          </KeyboardStickyView>
        </ScrollView>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  layout: {
    padding: 30,
    marginTop: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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
  notesText: {
    color: globalColors.primary,
  },
  linksContent: {
    marginBottom: 30,
    padding: 30,
  },
  links: {
    color: globalColors.primary,
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
});
