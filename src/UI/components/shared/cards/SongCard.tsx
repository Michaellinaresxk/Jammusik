import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalColors } from "../../../theme/Theme";
import Icon from "react-native-vector-icons/Ionicons";

type Props = {
  title: string;
  artist: string;
  onPress: () => void;
  color: string;
  resetToggle: boolean;
};

export const SongCard = ({
  title,
  artist,
  color,
  onPress,
  resetToggle,
}: Props) => {
  const [isDone, setIsDone] = useState(false);
  useEffect(() => {
    setIsDone(false);
  }, [resetToggle]);

  const handlePressIcon = () => {
    setIsDone(!isDone);
  };

  return (
    <TouchableOpacity
      style={[styles.songCard, { backgroundColor: isDone ? "#cccccc" : color }]}
      onPress={onPress}
      disabled={isDone}>
      <View style={styles.containerCard}>
        <View>
          <Text style={styles.songCardTitle}>{title}</Text>
          <Text style={styles.songCardArtist}>- {artist}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Icon
            name={isDone ? "checkmark-done-sharp" : "power-sharp"}
            color={globalColors.light}
            size={30}
            onPress={handlePressIcon}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  songCard: {
    borderRadius: 10,
    height: 85,
    width: 350,
    maxWidth: "100%",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  containerCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
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
  buttonContainer: {
    marginTop: 15,
  },
});
