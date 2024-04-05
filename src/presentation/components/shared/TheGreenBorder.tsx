import React from "react";
import { StyleSheet, View } from "react-native";
import { globalColors } from "../../theme/Theme";

export const TheGreenBorder = () => {
  return <View style={styles.greenBorder} />;
};

const styles = StyleSheet.create({
  greenBorder: {
    width: 7,
    height: "100%",
    zIndex: 1,
    position: "absolute",
    bottom: 0,
    backgroundColor: globalColors.primary,
  },
});
