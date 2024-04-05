import React from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { GlobalHeader } from "../../components/shared/GlobalHeader";
import { SongCard } from "../../components/shared/cards/SongCard";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { type RootStackParamsList } from "../../routes/StackNavigator";
import { globalColors } from "../../theme/Theme";
import { FloatingActionButton } from "../../components/shared/FloatingActionButton";
import { TheGreenBorder } from "../../components/shared/TheGreenBorder";
import { SongCounter } from "../../components/shared/SongCounter";

const songList = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Stix",
    artist: "Michael Linares",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Ruby pool",
    artist: "Vola",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "hoal",
    artist: "Mana",
  },
  {
    id: "58694a0f-3da1-471f-bd96-1fsfdsfdsfsd2",
    title: "Balads",
    artist: "Enanitos verdes",
  },
];

export const PlaylistSelectedScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  const params =
    useRoute<RouteProp<RootStackParamsList, "PlaylistScreen">>().params;

  return (
    <>
      <TheGreenBorder />
      <GlobalHeader headerTitle={params.title} />
      <FloatingActionButton
        onPress={() => Alert.alert("Registrado correctamente")}
      />
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
    </>
  );
};

const styles = StyleSheet.create({
  songCardContainer: {
    marginTop: 100,
    alignItems: "center",
  },
});
