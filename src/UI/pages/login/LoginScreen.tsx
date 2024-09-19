/* eslint-disable */
import {
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
import { KeyboardStickyView } from "react-native-keyboard-controller";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const userService = useUserService();
  const navigation = useNavigation();

  const image = {
    uri: images.loginBackground,
  };

  const handleLogin = async (values: { email: string; password: string }) => {
    const { email, password } = values;

    try {
      setIsLoading(true);

      if (!userService || typeof userService.loginUser !== "function") {
        throw new Error("El servicio de usuario no está disponible.");
      }

      await userService.loginUser(email, password);

      setEmail("");
      setPassword("");
      navigation.navigate("HomeScreen");
    } catch (error: any) {
      if (error.code === "auth/invalid-credential") {
        setError("Invalid credentials");
      } else {
        setError(error.message || "Ocurrió un error inesperado.");
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const offset = { closed: 0, opened: 100 };
  return (
    <ImageBackground source={image} resizeMode="cover" alt="Imagen de fondo">
      <View style={globalStyles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
            <KeyboardStickyView
              offset={offset}
              style={styles.containerLoginScreen}>
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
                  error={error}
                  setError={setError}
                  showPassword={showPassword}
                  toggleShowPassword={toggleShowPassword}
                />
                <LinkLoginRegister
                  text="Not a member yet?"
                  link="Register"
                  goTo={"RegisterScreen"}
                />
              </View>
            </KeyboardStickyView>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
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
