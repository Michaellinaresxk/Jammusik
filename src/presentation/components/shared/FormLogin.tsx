import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, Alert } from "react-native";
import { PrimaryButton } from "./PrimaryButton";
import { globalColors } from "../../theme/Theme";

export const Formlogin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <View style={style.containerForm}>
      <Text style={style.labelTitle}>Login</Text>

      <View style={style.form}>
        <View>
          <TextInput style={style.inputLogin} placeholder="Name" value={name} />
          <TextInput
            style={style.inputLogin}
            placeholder="Email"
            value={email}
            keyboardType="email-address" // Sets a suitable keyboard for email input
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <PrimaryButton
            label="SIGN IN"
            bgColor={globalColors.primary}
            borderRadius={35}
            colorText="#0000"
            onPress={() => Alert.alert("Registrado correctamente")}
          />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  containerForm: {
    height: "auto",
    color: "white",
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
    fontSize: 25,
    marginBottom: 40,
  },
});
