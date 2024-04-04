import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalColors } from "../../../theme/Theme";
import Icon from "react-native-vector-icons/Ionicons";

type Props = {
  title: string;
  artist: string;
  onPress: () => void;
  color: string;
};

export const SongCard = ({ title, artist, color, onPress }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.songCard, { backgroundColor: color }]}
      onPress={onPress}>
      <View style={styles.containerCard}>
        <View style={styles.textContent}>
          <Text style={styles.songCardTitle}>{title}</Text>
          <Text style={styles.songCardArtist}>- {artist}</Text>
        </View>
        <Icon
          name="checkmark-done-sharp"
          color={globalColors.light}
          size={30}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  songCard: {
    borderRadius: 10,
    height: 85,
    width: 300,
    maxWidth: "100%",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  containerCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContent: {},
  songCardTitle: {
    color: globalColors.light,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  songCardArtist: {
    color: globalColors.light,
    fontSize: 15,
    marginTop: 5,
  },
});
