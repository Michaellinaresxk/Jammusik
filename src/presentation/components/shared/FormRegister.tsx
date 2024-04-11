import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { PrimaryButton } from "./PrimaryButton";
import { globalColors } from "../../theme/Theme";
import { type Register } from "../../../types/formTypes";

interface FormRegisterProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onRegister: () => Promise<Register>;
}

export const FormRegister = ({
  email,
  setEmail,
  userName,
  setUserName,
  password,
  setPassword,
  onRegister,
}: FormRegisterProps) => {
  return (
    <View style={style.containerForm}>
      <View style={style.form}>
        <View>
          <TextInput
            style={style.inputLogin}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#838282"
          />
          <TextInput
            style={style.inputLogin}
            placeholder="User name"
            value={userName}
            onChangeText={setUserName}
            placeholderTextColor="#838282"
          />
          <TextInput
            style={style.inputLogin}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#838282"
            secureTextEntry={true}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <PrimaryButton
            label="REGISTER"
            bgColor={globalColors.primary}
            borderRadius={5}
            colorText={globalColors.secondary}
            btnFontSize={20}
            onPress={onRegister}
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
