import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Modal,
  Text,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { type RootStackParamsList } from "../../routes/StackNavigator";
import { RouteProp, useRoute } from "@react-navigation/native";
import { GlobalHeader } from "../../components/shared/GlobalHeader";
import { SongCard } from "../../components/shared/cards/SongCard";
import { globalColors } from "../../theme/Theme";
import { FloatingActionButton } from "../../components/shared/FloatingActionButton";
import { TheGreenBorder } from "../../components/shared/TheGreenBorder";
import { SongCounter } from "../../components/shared/SongCounter";
import { FormCreateSong } from "../../components/shared/forms/FormCreateSong";
import { useSongService } from "../../../context/SongServiceContext";
import { SongView } from "../../../views/SongView";
import { PrimaryButton } from "../../components/shared/PrimaryButton";
import { useResetSongsState } from "../../store/useResetSongsState";
import { usePullRefresh } from "../../../hooks/usePullRefresing";

export const PlaylistSelectedScreen = () => {
  const songService = useSongService();
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  const params =
    useRoute<RouteProp<RootStackParamsList, "PlaylistScreen">>().params;
  const playlistId = params.id as string;

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [songList, setSongList] = useState<SongView[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [triggerUpdate, setTriggerUpdate] = useState(false);

  const { isRefreshing, refresh, top } = usePullRefresh();

  const handleCreateSong = async () => {
    try {
      await songService.createSong(title, artist, categoryId, playlistId);
      setTitle("");
      setArtist("");
      setCategoryId("");
      setTriggerUpdate(prev => !prev);

      closeModal();
    } catch (error) {
      console.error("Failed to create song:", error);
      Alert.alert("Error", "Failed to create the song. Please try again.");
    }
  };

  useEffect(() => {
    const loadSongList = async () => {
      try {
        const fetchedSongs = await songService.getSongs(playlistId);
        setSongList(fetchedSongs);
      } catch (error) {
        console.error("Failed to fetch songList:", error);
      }
    };

    loadSongList();
  }, [playlistId, songService, triggerUpdate]);

  const closeModal = () => {
    setIsVisible(!isVisible);
  };

  const { resetToggle, resetAllSongs } = useResetSongsState();

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
          <GlobalHeader headerTitle={params.title} />
          <TheGreenBorder />
          <FloatingActionButton onPress={() => setIsVisible(true)} />
          <View style={styles.songCardContainer}>
            <SongCounter songCounter={songList.length} />
            <FlatList
              data={songList}
              keyExtractor={item => item.id}
              renderItem={({ item, index }) => (
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
              )}
            />
            <View>
              <TouchableOpacity style={styles.resetBtn} onPress={resetAllSongs}>
                <Text style={styles.resetBtnText}>RESET SONGS</Text>
              </TouchableOpacity>
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
        <FormCreateSong
          title={title}
          setTitle={setTitle}
          artist={artist}
          setArtist={setArtist}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          onCreateSong={handleCreateSong}
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
});
