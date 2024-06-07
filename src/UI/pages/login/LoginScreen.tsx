import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { globalColors, globalStyles } from "../../theme/Theme";
import { Formlogin } from "../../components/shared/forms/FormLogin";
import { images } from "../../../assets/img/Images";
import { BrandLogo } from "../../components/shared/BrandLogo";
import React, { useState } from "react";
import { LinkLoginRegister } from "../../components/shared/LinkLoginRegister";
import { useUserService } from "../../../context/UserServiceContext";
import { useNavigation } from "@react-navigation/native";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userService = useUserService();
  const navigation = useNavigation();

  const image = {
    uri: images.loginBackground,
  };

  const handleLogin = async values => {
    const { email, password } = values;

    try {
      setIsLoading(true);

      const res = await userService.loginUser(email, password);

      setEmail("");
      setPassword("");
      navigation.navigate("HomeScreen");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert(error.code);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView>
        <ImageBackground
          source={image}
          resizeMode="cover"
          alt="Imagen de fondo">
          <View style={globalStyles.overlay}>
            <View style={styles.containerLoginScreen}>
              <View style={styles.containerLogo}>
                <BrandLogo />
              </View>
              <Text style={styles.labelTitle}>Log In</Text>
              <View style={styles.containerForm}>
                <Formlogin
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  onLogin={handleLogin}
                  isLoading={isLoading}
                />
                <LinkLoginRegister
                  text="Not a member yet?"
                  link="Register"
                  goTo={"RegisterScreen"}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerLoginScreen: {
    marginTop: 100,
    flex: 1,
  },
  containerLogo: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  labelTitle: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: globalColors.light,
    marginTop: 50,
  },
  containerForm: {
    marginBottom: 150,
  },
});
