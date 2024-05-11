import React from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { globalColors } from "../../theme/Theme";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { type RootStackParamsList } from "../../routes/StackNavigator";

import { PlaylistCard } from "../../components/shared/cards/PlaylistCard";
import { TheGreenBorder } from "../../components/shared/TheGreenBorder";
import { PrimaryButton } from "../../components/shared/PrimaryButton";
import { usePlaylistService } from "../../../context/PlaylistServiceContext";
import { useEffect, useState } from "react";
import { PlaylistView } from "../../../views/PlaylistView";
import { getAuth } from "firebase/auth";
import { FormCreatePlaylist } from "../../components/shared/forms/FormCreatePlaylist";
import { Separator } from "../../components/shared/Separator";
import { HamburgerMenu } from "../../components/shared/HamburgerMenu";

export const PlaylistScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  const auth = getAuth();
  const playlistService = usePlaylistService();
  const [playlists, setPlaylists] = useState<PlaylistView[]>([]);
  const [triggerUpdate, setTriggerUpdate] = useState(false);

  const [title, setTitle] = useState("");
  const [mode, setMode] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadPlaylists = async () => {
      const user = auth.currentUser;
      const userId = user?.uid as string;
      try {
        const fetchedPlaylists = await playlistService.getPlaylists(userId);
        setPlaylists(fetchedPlaylists);
      } catch (error) {
        console.error("Failed to fetch playlists:", error);
      }
    };

    loadPlaylists();
  }, [auth.currentUser, playlistService, triggerUpdate]);

  const closeModal = () => {
    setIsVisible(!isVisible);
  };

  const handleCreatePlaylist = async () => {
    console.log("creando playlist");
    await playlistService.createPlaylist(title, mode);
    setTitle("");
    setMode("");
    setTriggerUpdate(prev => !prev);
    closeModal();
  };

  const handleDeletePlaylist = async (playlistId: string) => {
    console.log("Deleting playlist", playlistId);
    await playlistService.deletePlaylist(playlistId);
    setTriggerUpdate(prev => !prev);
  };

  return (
    <>
      <TheGreenBorder />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}>
        <ScrollView>
          <View style={styles.containerHeader}>
            <HamburgerMenu />
            <View style={styles.titleContent}>
              <Icon
                name="musical-notes-sharp"
                color={globalColors.primary}
                size={30}
              />
              <Text style={styles.title}>Playlists</Text>
            </View>
            <TouchableOpacity
              onPress={() => setIsVisible(true)}
              style={styles.openModalBtn}>
              {/* <Icon name="id-card-sharp" color={globalColors.primary} size={23} /> */}
              <Text style={styles.openModalBtnText}>+</Text>
            </TouchableOpacity>
          </View>
          <Separator color={globalColors.terceary} />

          <View style={styles.container}>
            <FlatList
              data={playlists}
              keyExtractor={item => item.id}
              numColumns={2}
              renderItem={({ item, index }) => (
                <View style={styles.playlistCardContainer}>
                  <PlaylistCard
                    title={item.title}
                    color={
                      index % 2 === 0
                        ? globalColors.primary
                        : globalColors.secondary
                    }
                    onPress={() =>
                      navigation.navigate("PlaylistSelectedScreen", {
                        id: item.id,
                        title: item.title,
                      })
                    }
                    onShare={() => Alert.alert("Compartiendo playlist")}
                    onDelete={() => handleDeletePlaylist(item.id)}
                  />
                </View>
              )}
            />
          </View>
          <Modal
            visible={isVisible}
            animationType="slide"
            presentationStyle="formSheet">
            <View style={styles.modalBtnContainer}>
              <Text style={styles.modalFormHeaderTitle}>Add Playlist Info</Text>
              <PrimaryButton
                label="Close"
                btnFontSize={20}
                colorText={globalColors.light}
                onPress={() => closeModal()}
              />
            </View>
            <FormCreatePlaylist
              title={title}
              setTitle={setTitle}
              mode={mode}
              setMode={setMode}
              onCreatePlaylist={handleCreatePlaylist}
            />
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
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
    fontWeight: "300",
  },
  titleContent: {
    flexDirection: "row",
    padding: 15,
    gap: 5,
    marginTop: 30,
    marginBottom: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  container: {
    marginBottom: 100,
  },
  playlistCardContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    padding: 30,
  },
  modalBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: globalColors.primary,
    paddingLeft: 22,
  },
  modalFormHeaderTitle: {
    fontSize: 20,
    color: globalColors.light,
  },
});
