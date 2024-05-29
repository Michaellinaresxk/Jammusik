import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalColors } from "../../../theme/Theme";
import Icon from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";

type Props = {
  title: string;
  onPress: () => void;
  color: string;
  onDelete: (playlistId: string) => void;
};

export const PlaylistCard = ({ title, onPress, onDelete, color }: Props) => {
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Comming soon... ",
      text2: "Share Funcionality, next release! 👋",
      topOffset: 90,
    });
  };

  const deleteConfirmation = () =>
    Alert.alert("Are you sure?", "Do you want to remove this playlist?", [
      {
        text: "UPS! BY MISTAKE",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "YES, DELETE!",
        onPress: () => onDelete(),
        style: "destructive",
      },
    ]);

  return (
    <TouchableOpacity
      style={[styles.playlistCard, { backgroundColor: color }]}
      onPress={onPress}>
      <Text style={styles.playlistCardText}>{title}</Text>
      <View style={styles.containerIcons}>
        <Icon
          name="share-social-sharp"
          color={globalColors.light}
          onPress={showToast}
          size={20}
        />
        <Icon
          name="trash-sharp"
          color={globalColors.light}
          onPress={event => {
            event.stopPropagation();
            deleteConfirmation();
          }}
          size={20}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  playlistCard: {
    backgroundColor: globalColors.primary,
    borderRadius: 5,
    height: 160,
    width: 150,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  playlistCardText: {
    color: globalColors.light,
    paddingHorizontal: 5,
    fontSize: 23,
  },
  containerIcons: {
    padding: 10,
    gap: 15,
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});
