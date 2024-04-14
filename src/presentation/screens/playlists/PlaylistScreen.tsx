import React from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
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

export const PlaylistScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  const auth = getAuth();
  const playlistService = usePlaylistService();
  const [playlists, setPlaylists] = useState<PlaylistView[]>([]);

  const [title, setTitle] = useState("");
  const [mode, setMode] = useState("");

  useEffect(() => {
    const loadPlaylists = async () => {
      const user = auth.currentUser;
      const userId = user?.uid as string;
      console.log(userId);
      try {
        const fetchedPlaylists = await playlistService.getPlaylists(userId);
        setPlaylists(fetchedPlaylists);
      } catch (error) {
        console.error("Failed to fetch playlists:", error);
      }
    };

    loadPlaylists();
  }, [auth.currentUser, playlistService]);

  const handleCreatePlaylist = async () => {
    console.log("creando playlist");
    await playlistService.createPlaylist(title, mode);
    setTitle("");
    setMode("");
  };

  return (
    <>
      <View style={styles.titleContent}>
        <Icon name="options-sharp" color={globalColors.primary} size={30} />
        <Text style={styles.title}>Playlists</Text>
      </View>
      <TheGreenBorder />
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
              />
            </View>
          )}
        />
        {/* <View style={styles.buttonContainer}>
          <PrimaryButton
            btnFontSize={18}
            borderRadius={5}
            bgColor={globalColors.primaryAlt}
            colorText={globalColors.primary}
            label="CREATE A NEW PLAYLIST"
            onPress={() => Alert.alert("Playlist creado correctamente")}
          />
        </View> */}

        <FormCreatePlaylist
          title={title}
          setTitle={setTitle}
          mode={mode}
          setMode={setMode}
          onCreatePlaylist={handleCreatePlaylist}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
});
