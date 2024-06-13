import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalColors } from "../../../theme/Theme";
import Icon from "react-native-vector-icons/Ionicons";
import { useToggleIsDone } from "../../../../hooks/useToggleIsDone";
import { auth } from "../../../../infra/api/firebaseConfig";

type Props = {
  title: string;
  artist: string;
  onPress: () => void;
  color: string;
  resetToggle: boolean;
  isDone: boolean;
  songId: string;
};

export const SongCard = ({
  title,
  artist,
  color,
  onPress,
  isDone,
  songId,
}: Props) => {
  const [changeIcon, setChangeIcon] = useState(isDone);
  const userId = auth.currentUser;

  const { settingIcons } = useToggleIsDone(isDone, userId, songId);

  const handlePressIcon = () => {
    setChangeIcon(!changeIcon);
    settingIcons(songId, changeIcon);
  };

  return (
    <TouchableOpacity
      style={[
        styles.songCard,
        { backgroundColor: changeIcon ? "#cccccc" : color },
      ]}
      onPress={onPress}>
      <View style={styles.containerCard}>
        <View>
          <Text style={styles.songCardTitle}>{title}</Text>
          <Text style={styles.songCardArtist}>- {artist}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Icon
            name={changeIcon ? "checkmark-done-sharp" : "power-sharp"}
            color={globalColors.light}
            size={30}
            onPress={() => handlePressIcon()}
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
