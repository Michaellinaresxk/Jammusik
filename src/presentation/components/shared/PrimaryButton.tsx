import React from "react";
import { Text, Pressable } from "react-native";
import { globalStyles } from "../../theme/Theme";

interface Props {
  label: string;
  bgColor: string;
  onPress: () => void;
}

export const PrimaryButton = ({ label, bgColor, onPress }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => ({
        ...globalStyles.primaryButton,
        backgroundColor: bgColor,
        opacity: pressed ? 0.8 : 1,
      })}
      onPress={() => console.log(onPress)}>
      <Text style={globalStyles.buttonText}>{label}</Text>
    </Pressable>
  );
};
