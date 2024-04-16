import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { globalColors } from "../../../theme/Theme";

type Props = {
  title: string;
  onPress: () => void;
};

export const CategoryCard = ({ title, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.categoryCard} onPress={onPress}>
      <Text style={styles.categoryCardText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    backgroundColor: globalColors.primary,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    height: 135,
    width: 150,
    margin: 10,
  },
  categoryCardText: {
    color: globalColors.light,
    fontSize: 23,
    paddingHorizontal: 5,
  },
});
