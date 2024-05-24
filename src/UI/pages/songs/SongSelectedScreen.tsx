import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { GlobalHeader } from "../../components/shared/GlobalHeader";
import { FloatingActionButton } from "../../components/shared/FloatingActionButton";
import { type RootStackParamsList } from "../../routes/StackNavigator";
import { RouteProp, useRoute } from "@react-navigation/native";
import { TheGreenBorder } from "../../components/shared/TheGreenBorder";
import { Text } from "react-native";
import { PrimaryIcon } from "../../components/shared/PrimaryIcon";
import { globalColors } from "../../theme/Theme";

export const SongSelectedScreen = () => {
  const params =
    useRoute<RouteProp<RootStackParamsList, "PlaylistSelectedScreen">>().params;

  return (
    <>
      <TheGreenBorder />
      <View>
        <GlobalHeader headerTitle={params.title} artist={params.artist} />
        <FloatingActionButton
          onPress={() => Alert.alert("Registrado correctamente")}
        />
      </View>
      <View style={styles.layout}>
        <View style={styles.container}>
          <Text style={styles.title}>Category:</Text>
          <View style={styles.titleContent}>
            <PrimaryIcon
              name="musical-notes-sharp"
              size={22}
              color={globalColors.primary}
            />
            <Text style={styles.category}> rock</Text>
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Key:</Text>
          <View style={styles.titleContent}>
            <Text style={styles.category}>F#</Text>
          </View>
        </View>
      </View>
      <View style={styles.linksContent}>
        <View style={{ ...styles.container, marginBottom: 30 }}>
          <Text style={styles.title}>Lyric link:</Text>
          <Text style={styles.links}>Acordes.com</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Tab link: </Text>
          <Text style={styles.links}>Acordes.com</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  layout: {
    padding: 30,
    marginTop: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: "bold",
    color: globalColors.secondary,
  },
  titleContent: {
    flexDirection: "row",
    gap: 5,
    backgroundColor: globalColors.primaryAlt,
    padding: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  category: {
    color: globalColors.primary,
    fontSize: 18,
  },
  linksContent: {
    marginTop: 30,
    marginBottom: 30,
    padding: 30,
  },
  links: {
    color: globalColors.primary,
  },
});
