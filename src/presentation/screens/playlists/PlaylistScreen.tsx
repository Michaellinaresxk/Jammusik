import React from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { globalColors } from "../../theme/Theme";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { type RootStackParamsList } from "../../routes/StackNavigator";

import { PlaylistCard } from "../../components/shared/cards/PlaylistCard";
import { TheGreenBorder } from "../../components/shared/TheGreenBorder";
import { PrimaryButton } from "../../components/shared/PrimaryButton";

const playlists = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Rock",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Jazz",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Latin",
  },
  {
    id: "58694a0f-3da1-471f-bd96-1fsfdsfdsfsd2",
    title: "Balads",
  },
];

export const PlaylistScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
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
        <View style={styles.buttonContainer}>
          <PrimaryButton
            btnFontSize={18}
            borderRadius={5}
            bgColor={globalColors.primaryAlt}
            colorText={globalColors.primary}
            label="CREATE A NEW PLAYLIST"
            onPress={() => Alert.alert("Playlist creado correctamente")}
          />
        </View>
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
