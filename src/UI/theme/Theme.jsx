import { StyleSheet } from "react-native";

export const globalColors = {
  primary: "#18998B",
  primaryAlt: "#dfeae9",
  primaryDark: "#184945",
  primaryDark1: "#186D65",
  primaryaryAlt1: "#22AA98",
  primaryaryAlt2: "#6ADEC9",
  primaryaryAlt3: "#A1EEDD",
  primaryaryAlt4: "#F0F7EE",

  secondary: "#070c0d",
  secondaryDark: "#000",
  terceary: "#838282",

  warning: "#fca311",
  danger: "#e71d36",
  dangerAlt2: "#eac6ca97",
  info: "#1372cb",
  light: "#F1FCF9",
};

export const globalFormStyles = StyleSheet.create({
  containerForm: {
    height: "auto",
    color: "white",
  },
  labelTitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    color: globalColors.light,
  },

  form: {
    width: "95%",
    padding: 10,
    alignSelf: "center",
    marginTop: 20,
  },

  labelText: {
    fontSize: 24,
  },

  inputLogin: {
    borderWidth: 0.2,
    borderBottomColor: globalColors.terceary,
    color: globalColors.terceary,
    fontSize: 20,
    marginBottom: 30,
    padding: 10,
  },

  radioButtonContainer: {
    marginTop: 10,
    marginBottom: 40,
  },
  radioButtonTitle: {
    fontSize: 20,
    color: globalColors.terceary,
    marginBottom: 30,
  },
  containerLink: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
});

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    padding: 20,
    width: "100%",
    height: "100%",
    opacity: 0.8,
    backgroundColor: "black",
  },
  primaryButton: {
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: globalColors.secondary,
    fontSize: 20,
  },
  buttonTextSecundary: {
    color: globalColors.primaryDark2,
    fontSize: 20,
    padding: 3,
  },
  containerLink: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  link: {
    fontWeight: "bold",
    color: globalColors.primary,
  },
});
