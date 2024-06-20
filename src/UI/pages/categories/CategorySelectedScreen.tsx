import React, { useCallback, useEffect, useState } from "react";
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
  useWindowDimensions,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamsList } from "../../routes/StackNavigator";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { Swipeable } from "react-native-gesture-handler";
import { useCategoryService } from "../../../context/CategoryServiceContext";
import { useSongWithOutPlaylistService } from "../../../context/SongWithOutPlaylistContext";
import { useSongService } from "../../../context/SongServiceContext";
import { getIsDone } from "../../../hooks/useToggleIsDone";
import { SongCounter } from "../../components/shared/SongCounter";
import { usePullRefresh } from "../../../hooks/usePullRefresing";
import { SongView } from "../../../views/SongView";
import { SongWithOutPlaylistView } from "../../../views/SongWithOutPlaylistView";
import { FloatingActionButton } from "../../components/shared/FloatingActionButton";
import { FormCreateSongWithOutPlaylist } from "../../components/shared/forms/FormCreateSongWithOutPlaylist";
import { globalColors } from "../../theme/Theme";
import { SongCard } from "../../components/shared/cards/SongCard";
import { PrimaryButton } from "../../components/shared/PrimaryButton";
import { GlobalHeader } from "../../components/shared/GlobalHeader";
import Svg, { Path } from "react-native-svg";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/Ionicons";

export const CategorySelectedScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  const params =
    useRoute<RouteProp<RootStackParamsList, "CategoriesScreen">>().params;
  const auth = getAuth();
  const userId = auth.currentUser?.uid as string;

  const categoryService = useCategoryService();
  const songWithOutPlaylistService = useSongWithOutPlaylistService();
  const songService = useSongService();

  const [songList, setSongList] = useState<SongView[]>([]);
  const [songListWithOutPlaylist, setSongListWithOutPlaylist] = useState<
    SongWithOutPlaylistView[]
  >([]);

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [currentSongId, setCurrentSongId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const categoryId = params.id as string;

  const [resetToggle, setResetToggle] = useState(false);
  const valueWidth = useWindowDimensions().width;

  const handleResetSongs = () => {
    setResetToggle(prev => !prev);
  };

  const loadSongList = useCallback(async () => {
    try {
      const [fetchedSongs, fetchedSongsWithoutPlaylist] = await Promise.all([
        categoryService.getSongListByCategory(userId, categoryId),
        songWithOutPlaylistService.getSongsWithOutPlaylist(userId, categoryId),
      ]);

      const songsWithIsDone = await Promise.all(
        fetchedSongs.map(async song => ({
          ...song,
          isDone: await getIsDone(song.id),
        })),
      );

      const songsWithoutPlaylistWithIsDone = await Promise.all(
        fetchedSongsWithoutPlaylist.map(async song => ({
          ...song,
          isDone: await getIsDone(song.id),
        })),
      );

      setSongList(songsWithIsDone);
      setSongListWithOutPlaylist(songsWithoutPlaylistWithIsDone);
    } catch (error) {
      console.error("Failed to fetch song lists:", error);
    }
  }, [categoryId, categoryService, songWithOutPlaylistService, userId]);

  useEffect(() => {
    loadSongList();
  }, [loadSongList]);

  useEffect(() => {
    loadSongList();
  }, [loadSongList]);

  useEffect(() => {
    if (triggerUpdate) {
      loadSongList();
      setTriggerUpdate(false);
    }
  }, [triggerUpdate, loadSongList]);

  const { isRefreshing, refresh, top } = usePullRefresh(loadSongList);

  const closeModal = () => {
    setIsVisible(!isVisible);
  };

  const handleCreateSongWithOutPlaylist = async values => {
    try {
      const { title, artist, isDone } = values;

      setIsLoading(true);
      await songWithOutPlaylistService.createSongWithOutPlaylist(
        userId,
        categoryId,
        title,
        artist,
        isDone,
      );
      setTitle("");
      setArtist("");
      setTriggerUpdate(prev => !prev);
      setIsLoading(false);

      closeModal();
    } catch (error) {
      console.error("Failed to create song:", error);
      Alert.alert("Error", "Failed to create the song. Please try again.");
    }
  };

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Song Deleted successfully",
    });
  };

  const handleDeleteSong = async (
    songId: string,
    isWithoutPlaylist: boolean,
  ) => {
    console.log(
      `Deleting song with ID: ${songId}, isWithoutPlaylist: ${isWithoutPlaylist}`,
    );
    try {
      if (isWithoutPlaylist) {
        console.log("Deleting song without playlist");
        await songWithOutPlaylistService.deleteSong(userId, songId);
      } else {
        console.log("Deleting song with playlist");
        await songService.deleteSong(userId, songId);
      }
      setTriggerUpdate(true);
      showToast();
    } catch (error) {
      console.error("Failed to delete song:", error);
      Alert.alert("Error", "Failed to delete the song. Please try again.");
    }
  };

  const deleteConfirmation = (songId: string, isWithoutPlaylist: boolean) =>
    Alert.alert("Are you sure?", "Do you want to remove this song?", [
      {
        text: "UPS! BY MISTAKE",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "YES, DELETE!",
        onPress: () => handleDeleteSong(songId, isWithoutPlaylist),
        style: "destructive",
      },
    ]);

  const swipeRightActions = (songId: string, isWithoutPlaylist: boolean) => (
    <TouchableOpacity
      style={styles.deleteButtonContent}
      onPress={() => deleteConfirmation(songId, isWithoutPlaylist)}>
      <Icon name="trash-sharp" size={25} style={styles.deleteIcon} />
    </TouchableOpacity>
  );

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}>
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
            <FloatingActionButton onPress={() => setIsVisible(true)} />
            <View style={styles.songCardContainer}>
              <SongCounter songCounter={songList.length} />
              <FlatList
                data={songList}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => {
                  return (
                    <Swipeable
                      renderRightActions={() =>
                        swipeRightActions(item.id, false)
                      }
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
                            navigation.navigate("SongSelectedScreen", {
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
              {songListWithOutPlaylist.length > 0 && (
                <View style={styles.titleContainer}>
                  <Text style={styles.bigTitle}>Songs Without playlist:</Text>
                  <Svg
                    width="50"
                    height="50"
                    viewBox="0 0 69 53"
                    fill="none"
                    style={styles.brandLogo}>
                    <Path
                      d="M15.3333 42.4H23V10.6H15.3333V42.4ZM30.6667 53H38.3333V0H30.6667V53ZM0 31.8H7.66667V21.2H0V31.8ZM46 42.4H53.6667V10.6H46V42.4ZM61.3333 21.2V31.8H69V21.2H61.3333Z"
                      fill="#56B5A6"
                    />
                  </Svg>

                  <SongCounter songCounter={songListWithOutPlaylist.length} />
                </View>
              )}
              <FlatList
                data={songListWithOutPlaylist}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => {
                  return (
                    <Swipeable
                      renderRightActions={() =>
                        swipeRightActions(item.id, true)
                      }
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
                            navigation.navigate("SongSelectedScreen", {
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
              <View>
                <TouchableOpacity
                  style={styles.resetBtn}
                  onPress={handleResetSongs}>
                  <Text style={styles.resetBtnText}>RESET SONGS</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Modal
        visible={isVisible}
        animationType="slide"
        presentationStyle="formSheet">
        <View style={[styles.modalBtnContainer, { paddingRight: 30 }]}>
          <Text style={styles.modalFormHeaderTitle}>Add Song Info</Text>
          <PrimaryButton
            label="Close"
            btnFontSize={20}
            colorText={globalColors.light}
            onPress={() => closeModal()}
          />
        </View>
        <FormCreateSongWithOutPlaylist
          title={title}
          setTitle={setTitle}
          artist={artist}
          setArtist={setArtist}
          categoryId={categoryId}
          onCreateSong={handleCreateSongWithOutPlaylist}
          isLoading={isLoading}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  songCardContainer: {
    marginTop: 100,
    paddingHorizontal: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  bigTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "300",
    color: globalColors.terceary,
  },
  title: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: "bold",
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
    width: "50%",
  },
  resetBtnText: {
    color: globalColors.primary,
  },
  modalBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: globalColors.primary,
    paddingLeft: 35,
  },
  modalFormHeaderTitle: {
    fontSize: 20,
    color: globalColors.light,
  },
  brandLogo: {
    marginBottom: 40,
    alignSelf: "center",
  },
  deleteButtonContent: {
    backgroundColor: globalColors.danger,
    borderRadius: 10,
    height: 85,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteIcon: {
    color: globalColors.light,
  },
});
