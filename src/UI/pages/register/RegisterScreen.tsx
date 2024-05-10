import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { globalColors, globalStyles } from "../../theme/Theme";
import { images } from "../../../assets/img/Images";
import { BrandLogo } from "../../components/shared/BrandLogo";
import { FormRegister } from "../../components/shared/forms/FormRegister";
import { LinkLoginRegister } from "../../components/shared/LinkLoginRegister";
import { useUserService } from "../../../context/UserServiceContext";

export const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const userService = useUserService();

  const navigation = useNavigation();

  const image = {
    uri: images.loginBackground,
  };

  // Function to handle registration logic
  const handleRegister = async () => {
    console.log(email, password, userName);
    await userService.registerUser(email, password, userName);
    setEmail("");
    setUserName("");
    setPassword("");
    navigation.navigate("ProfileScreen");
  };

  return (
    <ImageBackground
      source={image}
      style={styles.containerImage}
      resizeMode="cover"
      alt="Imagen de fondo">
      <View style={globalStyles.overlay}>
        <View style={styles.containerLoginScreen}>
          <View style={styles.containerLogo}>
            <BrandLogo />
          </View>
          <Text style={styles.labelTitle}>Register</Text>
          <View style={styles.containerForm}>
            <FormRegister
              email={email}
              setEmail={setEmail}
              userName={userName}
              setUserName={setUserName}
              password={password}
              setPassword={setPassword}
              onRegister={() => handleRegister()}
            />
            <LinkLoginRegister
              text="Have an account?"
              link="Login"
              goTo="LoginScreen"
            />
          </View>
        </View>
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
    marginTop: 100,
    flex: 1,
  },
  containerLogo: {
    paddingTop: 50,
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
    color: globalColors.light,
  },
  containerForm: {
    flex: 3,
  },
});
