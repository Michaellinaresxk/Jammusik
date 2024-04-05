import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, Alert } from "react-native";
import { PrimaryButton } from "./PrimaryButton";
import { globalColors } from "../../theme/Theme";

export const Formlogin = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  return (
    <View style={style.containerForm}>
      <Text style={style.labelTitle}>Login</Text>

      <View style={style.form}>
        <View>
          <TextInput
            style={style.inputLogin}
            placeholderTextColor="#838282"
            keyboardType="email-address"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={style.inputLogin}
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            placeholderTextColor="#838282"
            onChangeText={setPassword}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <PrimaryButton
            label="SIGN IN"
            bgColor={globalColors.primary}
            borderRadius={5}
            colorText={globalColors.secondary}
            btnFontSize={20}
            onPress={() => Alert.alert("Logueado correctamente")}
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
    borderBottomColor: globalColors.terceary,
    color: globalColors.light,
    fontSize: 20,
    marginBottom: 40,
  },
});
