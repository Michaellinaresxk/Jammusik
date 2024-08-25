import React, { useCallback } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  RefreshControl,
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
import { usePullRefresh } from "../../../hooks/usePullRefresing";
import Toast from "react-native-toast-message";

export const PlaylistScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  const auth = getAuth();
  const playlistService = usePlaylistService();
  const [playlists, setPlaylists] = useState<PlaylistView[]>([]);
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const loadPlaylists = useCallback(async () => {
    const user = auth.currentUser;
    const userId = user?.uid as string;
    try {
      const fetchedPlaylists = await playlistService.getPlaylists(userId);
      setPlaylists(fetchedPlaylists);
    } catch (error) {
      console.error("Failed to fetch playlists:", error);
    }
  }, [auth.currentUser, playlistService]);

  useEffect(() => {
    // Load playlist when the component mounts
    loadPlaylists();
  }, [loadPlaylists]);

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
      type: "success",
      text1: "Playlist Deleted successfully. 👋",
    });
  };

  const handleCreatePlaylist = async (values: any) => {
    const { title } = values;
    setIsLoading(true);
    await playlistService.createPlaylist(title);
    setTitle("");
    setTriggerUpdate(true);
    setIsLoading(false);

    closeModal();
  };

  const handleDeletePlaylist = async (playlistId: string) => {
    await playlistService.deletePlaylist(playlistId);
    setTriggerUpdate(true);
    showToast();
  };

  const { isRefreshing, refresh, top } = usePullRefresh(loadPlaylists);

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
          <View
            style={{
              flex: 1,
              paddingHorizontal: 15,
              marginTop: 40,
            }}>
            <Pressable
              style={styles.goBackContent}
              onPress={() => navigation.navigate("HomeScreen")}>
              <Icon
                name="arrow-back-sharp"
                color={globalColors.primary}
                size={30}
              />
            </Pressable>
            <View style={styles.containerHeader}>
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
          </View>
          <Separator color={globalColors.terceary} />

          <View>
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
              onCreatePlaylist={handleCreatePlaylist}
              isLoading={isLoading}
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
    paddingHorizontal: 5,
  },
  goBackContent: {
    fontSize: 15,
    fontWeight: "bold",
    margin: "auto",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  goBackLabel: {
    fontSize: 15,
    color: globalColors.terceary,
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
    color: globalColors.primaryDark,
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
    paddingRight: 20,
  },
  modalFormHeaderTitle: {
    fontSize: 20,
    color: globalColors.light,
  },
});
