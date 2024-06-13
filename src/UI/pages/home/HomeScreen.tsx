import React, { useState, useCallback } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CategoryCardLight } from "../../components/shared/cards/CategoryCardLight";
import {
  type NavigationProp,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { type RootStackParamsList } from "../../routes/StackNavigator";
import { GlobalHeader } from "../../components/shared/GlobalHeader";
import { globalColors } from "../../theme/Theme";
import { useCategoryService } from "../../../context/CategoryServiceContext";
import { CategoryView } from "../../../views/CategoryView";
import { usePlaylistService } from "../../../context/PlaylistServiceContext";
import { auth } from "../../../infra/api/firebaseConfig";
import { PlaylistView } from "../../../views/PlaylistView";
import { PlaylistCard } from "../../components/shared/cards/PlaylistCard";
import { SliderQuotes } from "../../components/shared/SliderQuotes";
import { usePullRefresh } from "../../../hooks/usePullRefresing";
import Toast from "react-native-toast-message";

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  const categoryService = useCategoryService();
  const playlistService = usePlaylistService();
  const [categories, setCategories] = useState<CategoryView[]>([]);
  const [playlists, setPlaylists] = useState<PlaylistView[]>([]);
  const [triggerUpdate, setTriggerUpdate] = useState(false);

  const loadData = useCallback(async () => {
    const user = auth.currentUser;
    const userId = user?.uid as string;

    try {
      const [fetchedCategories, fetchedPlaylists] = await Promise.all([
        categoryService.getCategories(userId),
        playlistService.getPlaylists(userId),
      ]);
      setCategories(fetchedCategories);
      setPlaylists(fetchedPlaylists);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }, [categoryService, playlistService]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData, triggerUpdate]),
  );

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Playlist Deleted successfully. 👋",
    });
  };

  const handleDeletePlaylist = async (playlistId: string) => {
    console.log("Deleting playlist", playlistId);
    await playlistService.deletePlaylist(playlistId);
    setTriggerUpdate(prev => !prev); // Trigger the update
    showToast();
  };

  const { isRefreshing, refresh, top } = usePullRefresh(loadData);

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
            <GlobalHeader headerTitle="Home" />

            <View style={styles.categoryCardContainer}>
              <Text style={styles.subTitle}>Categories:</Text>
              <FlatList
                data={categories}
                keyExtractor={item => item.id}
                horizontal={true}
                renderItem={({ item }) => (
                  <CategoryCardLight
                    title={item.title}
                    onPress={() =>
                      navigation.navigate("CategorySelectedScreen", {
                        id: item.id,
                        title: item.title,
                      })
                    }
                  />
                )}
              />
              <SliderQuotes />
              <View style={styles.playlistContainer}>
                <Text style={styles.subTitle}>Playlists:</Text>
                <FlatList
                  data={playlists}
                  keyExtractor={item => item.id}
                  numColumns={2}
                  renderItem={({ item, index }) => (
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
                  )}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "red",
    fontSize: 30,
  },
  subTitle: {
    marginBottom: 5,
    fontSize: 18,
    color: globalColors.terceary,
  },
  categoryCardContainer: {
    padding: 30,
  },
  playlistContainer: {
    marginTop: 60,
  },
});
