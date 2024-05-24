import React, { useEffect, useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamsList } from "../../routes/StackNavigator";
import { NavigationProp, useNavigation } from "@react-navigation/native";
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
} from "react-native";
import { GlobalHeader } from "../../components/shared/GlobalHeader";
import { TheGreenBorder } from "../../components/shared/TheGreenBorder";
import { useCategoryService } from "../../../context/CategoryServiceContext";
import { useSongWithOutPlaylistService } from "../../../context/SongWithOutPlaylistContext";
import { getAuth } from "firebase/auth";
import { globalColors } from "../../theme/Theme";
import { SongCounter } from "../../components/shared/SongCounter";
import { SongCard } from "../../components/shared/cards/SongCard";
import { usePullRefresh } from "../../../hooks/usePullRefresing";
import { SongView } from "../../../views/SongView";
import { FloatingActionButton } from "../../components/shared/FloatingActionButton";
import { PrimaryButton } from "../../components/shared/PrimaryButton";
import { FormCreateSongWithOutPlaylist } from "../../components/shared/forms/FormCreateSongWithOutPlaylist";

export const CategorySelectedScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  const params =
    useRoute<RouteProp<RootStackParamsList, "CategoriesScreen">>().params;
  const auth = getAuth();

  const categoryService = useCategoryService();
  const songWithOutPlaylistService = useSongWithOutPlaylistService();
  const userId = auth.currentUser?.uid as string;
  const [songList, setSongList] = useState<SongView[]>([]);

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [triggerUpdate, setTriggerUpdate] = useState(false);

  const categoryId = params.id as string;

  const [resetToggle, setResetToggle] = useState(false);

  const handleResetSongs = () => {
    setResetToggle(prev => !prev);
  };

  const { isRefreshing, refresh, top } = usePullRefresh();

  useEffect(() => {
    const fetchSongList = async () => {
      try {
        let fetchedSongs = await categoryService.getSongListByCategory(
          categoryId,
          userId,
        );

        setSongList(fetchedSongs);
      } catch (error) {
        console.error("Failed to fetch song list:", error);
      }
    };

    fetchSongList();
  }, [categoryId, categoryService, userId, triggerUpdate]);

  if (!categoryId) {
    console.error("Failed to retrieve categoryId");
    return null;
  }

  const closeModal = () => {
    setIsVisible(!isVisible);
  };

  const handleCreateSongWithOutPlaylist = async () => {
    if (!title || !artist || !categoryId) {
      Alert.alert("Error", "All fields must be filled!");
      return;
    }

    try {
      await songWithOutPlaylistService.createSongWithOutPlaylist(
        title,
        artist,
        categoryId,
      );
      setTitle("");
      setArtist("");
      setTriggerUpdate(prev => !prev);
      console.log(title, artist, categoryId);
      closeModal();
    } catch (error) {
      console.error("Failed to create song:", error);
      Alert.alert("Error", "Failed to create the song. Please try again.");
    }
  };

  return (
    <>
      <TheGreenBorder />
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
                    <View>
                      <SongCard
                        resetToggle={resetToggle}
                        title={item.title}
                        artist={item.artist}
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
        <View style={styles.modalBtnContainer}>
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
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  songCardContainer: {
    marginTop: 100,
    alignItems: "center",
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
});
