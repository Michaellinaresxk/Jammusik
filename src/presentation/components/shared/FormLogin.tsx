import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { PrimaryButton } from "./PrimaryButton";
import { globalColors } from "../../theme/Theme";
import { useNavigation } from "@react-navigation/native";

export const Formlogin = () => {
  const navigation = useNavigation();
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

        <View style={style.containerLink}>
          <Text>Not a member yet? </Text>
          <Pressable onPress={() => navigation.navigate("RegisterScreen")}>
            <Text style={style.link}>REGISTER</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  containerForm: {
    flex: 1,
    height: "auto",
    color: "white",
  },
  labelTitle: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
    color: globalColors.light,
  },

  form: {
    width: "100%",
    padding: 10,
    alignSelf: "center",
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
  link: {
    fontWeight: "bold",
    color: globalColors.primary,
  },
  containerLink: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
});
