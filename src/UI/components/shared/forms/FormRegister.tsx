import React from "react";
import { View, TextInput } from "react-native";
import { PrimaryButton } from "../PrimaryButton";
import { globalColors, globalFormStyles } from "../../../theme/Theme";
import { type Register } from "../../../../types/formTypes";

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
    <View style={globalFormStyles.containerForm}>
      <View style={globalFormStyles.form}>
        <View>
          <TextInput
            style={globalFormStyles.inputLogin}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#838282"
            autoCorrect={false}
            autoCapitalize="none"
          />
          <TextInput
            style={globalFormStyles.inputLogin}
            placeholder="User name"
            autoCorrect={false}
            autoCapitalize="none"
            value={userName}
            onChangeText={setUserName}
            placeholderTextColor="#838282"
          />
          <TextInput
            style={globalFormStyles.inputLogin}
            placeholder="Password"
            value={password}
            autoCorrect={false}
            autoCapitalize="none"
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
