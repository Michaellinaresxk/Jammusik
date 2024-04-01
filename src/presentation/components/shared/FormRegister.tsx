import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, Alert } from "react-native";
import { PrimaryButton } from "./PrimaryButton";
import { globalColors } from "../../theme/Theme";

export const FormRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <View style={style.containerForm}>
      <Text style={style.labelTitle}>Register</Text>

      <View style={style.form}>
        <View>
          <TextInput
            style={style.inputLogin}
            placeholder="Name"
            value={name}
            onChangeText={setName} // Automatically updates the name state
          />
          <TextInput
            style={style.inputLogin}
            placeholder="Email"
            value={email}
            onChangeText={setEmail} // Automatically updates the email state
            keyboardType="email-address" // Sets a suitable keyboard for email input
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <PrimaryButton
            label="REGISTER"
            bgColor={globalColors.primary}
            onPress={() => Alert.alert("Registrado correctamente")}
            borderRadius={35}
            colorText="#0000"
          />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  containerForm: {
    height: "auto",
  },
  labelTitle: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: globalColors.light,
  },

  form: {
    width: "100%",
    padding: 10,
    alignSelf: "center",
    marginTop: 20,
  },

  labelText: {
    fontSize: 24,
    color: globalColors.light,
  },

  inputLogin: {
    borderWidth: 1,
    borderBottomColor: "white",
    color: globalColors.light,
    fontSize: 20,
    marginBottom: 40,
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
