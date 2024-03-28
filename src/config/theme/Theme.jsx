import { StyleSheet } from "react-native";

export const globalColors = {
  primary: "#18998B",
  primaryDark: "#184945",
  primaryDark1: "#186D65",
  primaryaryAlt1: "#22AA98",
  primaryaryAlt2: "#6ADEC9",
  primaryaryAlt3: "#A1EEDD",
  primaryaryAlt4: "#F0F7EE",

  secondary: "#82B2A",

  warning: "#fca311",
  danger: "#e71d36",

  light: "#F1FCF9",
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  primaryButton: {
    backgroundColor: globalColors.primary,
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: globalColors.light,
    fontSize: 20,
  },
});
