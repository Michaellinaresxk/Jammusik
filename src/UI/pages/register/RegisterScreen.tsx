import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Animated,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { globalColors, globalStyles } from "../../theme/Theme";
import { images } from "../../../assets/img/Images";
import { BrandLogo } from "../../components/shared/BrandLogo";
import { FormRegister } from "../../components/shared/forms/FormRegister";
import { LinkLoginRegister } from "../../components/shared/LinkLoginRegister";
import { useUserService } from "../../../context/UserServiceContext";
import useAnimationKeyboard from "../../../hooks/useAnimationKeyboard";

export const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false)

  const userService = useUserService();

  const navigation = useNavigation();

  const image = {
    uri: images.loginBackground,
  };

  // Function to handle registration logic
  const handleRegister = async values => {
    const { email, password, userName } = values;
    setIsLoading(true);
    try {
      await userService.registerUser(email, password, userName);
      setEmail("");
      setUserName("");
      setPassword("");
      setIsLoading(false);
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/email-already-in-use") {
        setError("The email already in use, please a use it on another ");
      }
      setTimeout(() => {
        setError("");
      }, 5000);
      setIsLoading(false);

      setIsLoading(false);
    }
  };

  const { height, scale, KeyboardGestureArea } = useAnimationKeyboard()


  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <ImageBackground
      source={image}
      style={styles.containerImage}
      resizeMode="cover"
      alt="Imagen de fondo">
      <View style={globalStyles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <KeyboardGestureArea interpolator="ios">
            <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
              <Animated.View style={{
                ...styles.containerLoginScreen,
                transform: [{ translateY: height }, { scale }],
              }}>

                <View style={styles.containerLogo}>
                  <BrandLogo />
                </View>
                <Text style={styles.labelTitle}>Register</Text>
                <View style={{ marginBottom: 100 }}>
                  <FormRegister
                    email={email}
                    setEmail={setEmail}
                    userName={userName}
                    setUserName={setUserName}
                    password={password}
                    setPassword={setPassword}
                    isLoading={isLoading}
                    onRegister={handleRegister}
                    error={error}
                    setError={setError}
                    showPassword={showPassword}
                    toggleShowPassword={toggleShowPassword}
                  />
                  <LinkLoginRegister
                    text="Have an account?"
                    link="Login"
                    goTo="LoginScreen"
                  />
                </View>
              </Animated.View>
            </ScrollView>
          </KeyboardGestureArea>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  containerImage: {
    flex: 1,
    justifyContent: "center",
  },
  containerLoginScreen: {
    marginTop: 90,
    flex: 1,
  },
  containerLogo: {
    paddingTop: 20,
    marginBottom: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  labelText: {
    fontSize: 24,
    color: globalColors.light,
  },
  labelTitle: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    marginTop: -30,
    color: globalColors.light,
  },
});
