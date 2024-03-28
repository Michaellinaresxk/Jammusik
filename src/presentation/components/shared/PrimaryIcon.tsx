import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
  name: string;
  size?: number;
  color?: string;
}

export const PrimaryIcon = ({ name, size = 20, color = "black" }: Props) => {
  return <Icon name={name} size={size} color={color} />;
};
