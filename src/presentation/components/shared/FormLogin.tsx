import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { PrimaryButton } from "./PrimaryButton";
export const Formlogin = () => {
  return (
    <View style={style.containerForm}>
      <View style={style.form}>
        <Text>Use name:</Text>
        <TextInput placeholder="username" style={style.inputLogin} />
        <Text>Username</Text>

        <TextInput placeholder="password" style={style.inputLogin} />
        <PrimaryButton label="SUBMIT" />

      </View>
    </View>
  );
};

const style = StyleSheet.create({
  containerForm: {
    width: "100%",
    height: "auto",
    color: "white",
  },

  form: {},
  inputLogin: {
    borderColor:'red',
    borderBottomColor: "black",
  },
});
