/* eslint-disable */
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View, Animated
} from "react-native";
import { globalColors, globalStyles } from "../../theme/Theme";
import { Formlogin } from "../../components/shared/forms/FormLogin";
import { images } from "../../../assets/img/Images";
import { BrandLogo } from "../../components/shared/BrandLogo";
import React, { useState } from "react";
import { LinkLoginRegister } from "../../components/shared/LinkLoginRegister";
import { useUserService } from "../../../context/UserServiceContext";
import { useNavigation } from "@react-navigation/native";
import useAnimationKeyboard from "../../../hooks/useAnimationKeyboard";



export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const userService = useUserService();
  const { height, scale, KeyboardGestureArea } = useAnimationKeyboard()
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
      if (error.code === "auth/invalid-credential") {
        setError("Invalid credentials");
      }
      setTimeout(() => {
        setError("");
      }, 5000);
      setIsLoading(false);
    }
  };


  return (
    <ImageBackground source={image} resizeMode="cover" alt="Imagen de fondo">
      <KeyboardGestureArea interpolator="ios">
        <ScrollView>
          <View style={globalStyles.overlay}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : undefined}>


              <Animated.View style={{
                ...styles.containerLoginScreen,
                transform: [{ translateY: height }, { scale }],
              }}>
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
                  />
                  <LinkLoginRegister
                    text="Not a member yet?"
                    link="Register"
                    goTo={"RegisterScreen"}
                  />
                </View>
              </Animated.View>



            </KeyboardAvoidingView>
          </View>

        </ScrollView>
      </KeyboardGestureArea>
    </ImageBackground >
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
