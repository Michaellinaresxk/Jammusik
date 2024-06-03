import { Text, View, TextInput } from "react-native";
import { PrimaryButton } from "../PrimaryButton";
import { globalColors, globalFormStyles } from "../../../theme/Theme";

interface FormLoginProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onLogin: () => Promise<void>;
}

export const Formlogin = ({
  email,
  setEmail,
  password,
  setPassword,
  onLogin,
}: FormLoginProps) => {
  return (
    <View style={globalFormStyles.containerForm}>
      <Text style={globalFormStyles.labelTitle}></Text>

      <View style={globalFormStyles.form}>
        <View>
          <TextInput
            style={globalFormStyles.inputLogin}
            placeholderTextColor="#838282"
            keyboardType="email-address"
            placeholder="Email"
            value={email}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
          />
          <TextInput
            style={globalFormStyles.inputLogin}
            placeholder="Password"
            autoCorrect={false}
            autoCapitalize="none"
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
            onPress={onLogin}
          />
        </View>
      </View>
    </View>
  );
};
