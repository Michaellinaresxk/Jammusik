import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { globalColors } from "../../theme/Theme";

type Props = {
  title: string;
};

export const CategoryCard = ({ title }: Props) => {
  return (
    <View style={styles.categoryCard}>
      <Text style={styles.categoryCardText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    backgroundColor: globalColors.primary,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    height: 140,
    width: 135,
    margin: 10,
  },
  categoryCardText: {
    color: globalColors.light,
    fontSize: 25,
    paddingHorizontal: 5,
  },
});
