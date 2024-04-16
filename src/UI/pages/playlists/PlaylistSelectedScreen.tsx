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
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { GlobalHeader } from "../../components/shared/GlobalHeader";
import { SongCard } from "../../components/shared/cards/SongCard";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { type RootStackParamsList } from "../../routes/StackNavigator";
import { globalColors } from "../../theme/Theme";
import { FloatingActionButton } from "../../components/shared/FloatingActionButton";
import { TheGreenBorder } from "../../components/shared/TheGreenBorder";
import { SongCounter } from "../../components/shared/SongCounter";
import { FormCreateSong } from "../../components/shared/forms/FormCreateSong";
import { useSongService } from "../../../context/SongServiceContext";
import { SongView } from "../../../views/SongView";
import { PrimaryButton } from "../../components/shared/PrimaryButton";

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

  const handleCreateSong = async () => {
    console.log("Creating song with:", {
      title,
      artist,
      categoryId,
      playlistId,
    });

    if (!title || !artist || !categoryId || !playlistId) {
      Alert.alert("Error", "All fields must be filled!");
      return;
    }

    try {
      await songService.createSong(title, artist, categoryId, playlistId);
      setTitle("");
      setArtist("");
      setCategoryId("");
      setTriggerUpdate(prev => !prev);

      // Assuming closeModal is a function to close the modal
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
        // console.log("obteniendo cancion playlist id es:", playlistId);
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

  return (
    <>
      <TheGreenBorder />
      <GlobalHeader headerTitle={params.title} />
      <FloatingActionButton onPress={() => setIsVisible(true)} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView>
          <View style={styles.songCardContainer}>
            <SongCounter songCounter={4} />
            <FlatList
              data={songList}
              keyExtractor={item => item.id}
              renderItem={({ item, index }) => (
                <View>
                  <SongCard
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
                      })
                    }
                  />
                </View>
              )}
            />
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
});
