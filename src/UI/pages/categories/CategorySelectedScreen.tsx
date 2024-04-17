import React, { useCallback, useEffect, useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamsList } from "../../routes/StackNavigator";
import { FlatList, StyleSheet, View } from "react-native";
import { GlobalHeader } from "../../components/shared/GlobalHeader";
import { TheGreenBorder } from "../../components/shared/TheGreenBorder";
import { useCategoryService } from "../../../context/CategoryServiceContext";
import { SongView } from "../../../views/SongView";
import { SongCounter } from "../../components/shared/SongCounter";
import { SongCard } from "../../components/shared/cards/SongCard";
import { globalColors } from "../../theme/Theme";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";

export const CategorySelectedScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  const params =
    useRoute<RouteProp<RootStackParamsList, "CategorySelectedScreen">>().params;
  const categoryService = useCategoryService();
  const auth = getAuth();
  const [songList, setSongList] = useState<SongView[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSongByCategory = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) {
          throw new Error("User not logged in");
        }

        const fetchedSongList = await categoryService.getSongListByCategory(
          userId,
          params.id,
        );
        setSongList(fetchedSongList);
      } catch (err) {
        setError("Failed to fetch songs: " + err.message);
        console.error(err);
      }
    };

    loadSongByCategory();
  }, [auth.currentUser, auth.currentUser?.uid, categoryService, params.id]);

  const renderItem = useCallback(
    ({ item, index }) => (
      <View>
        <SongCard
          title={item.title}
          artist={item.artist}
          color={
            index % 2 === 0 ? globalColors.primary : globalColors.secondary
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
    ),
    [navigation],
  );

  return (
    <>
      <TheGreenBorder />
      <View>
        <GlobalHeader headerTitle={params.title} />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <View style={styles.songCardContainer}>
          <SongCounter songCounter={songList.length} />
          <FlatList
            data={songList}
            keyExtractor={item => item.id.toString()} // Ensuring key is a string
            renderItem={renderItem}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  songCardContainer: {
    marginTop: 100,
    alignItems: "center",
  },
});
