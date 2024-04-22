import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface Props {
  style?: StyleProp<ViewStyle>;
  color?: string;
}

export const Separator = ({ style, color }: Props) => {
  return (
    <View
      style={[
        {
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: 1,
          backgroundColor: color,
          opacity: 0.1,
          marginVertical: 8,
        },
        style,
      ]}
    />
  );
};
