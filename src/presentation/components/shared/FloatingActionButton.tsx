import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { globalColors } from "../../theme/Theme";

type Props = {
  onPress: () => void;
};

export const FloatingActionButton = ({ onPress }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => ({
        borderRadius: 50,
        height: 70,
        width: 70,
        backgroundColor: globalColors.primary,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 165,
        right: 30,
        opacity: pressed ? 0.8 : 1,
      })}
      onPress={() => onPress()}>
      <Icon name="add-sharp" color={globalColors.light} size={35} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  floatingButtonContainer: {},
  icon: {},
});
