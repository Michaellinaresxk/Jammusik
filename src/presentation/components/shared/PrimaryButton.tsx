import React from "react";
import { Text, Pressable } from "react-native";
import { globalStyles } from "../../theme/Theme";

interface Props {
  label: string;
  bgColor: string;
  onPress: () => void;
  borderRadius?: number;
  colorText?: string;
}

export const PrimaryButton = ({
  label,
  bgColor,
  onPress,
  borderRadius,
  colorText,
}: Props) => {
  return (
    <Pressable
      style={({ pressed }) => ({
        ...globalStyles.primaryButton,
        backgroundColor: bgColor,
        opacity: pressed ? 0.8 : 1,
        borderRadius: borderRadius ? borderRadius : 0,
      })}
      onPress={() => onPress()}>
      <Text
        style={
          colorText ? globalStyles.buttonTextSecundary : globalStyles.buttonText
        }>
        {label}
      </Text>
    </Pressable>
  );
};
