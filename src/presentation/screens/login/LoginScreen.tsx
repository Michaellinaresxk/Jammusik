import { ImageBackground, StyleSheet, View } from "react-native";
import { globalStyles } from "../../theme/Theme";
import { Formlogin } from "../../components/shared/FormLogin";
import { images } from "../../../assets/img/Images";
import { BrandLogo } from "../../components/shared/BrandLogo";
import React, { useState } from "react";
import { LinkLoginRegister } from "../../components/shared/LinkLoginRegister";
import { useUserService } from "../../../context/UserServiceContext";
import { useNavigation } from "@react-navigation/native";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userService = useUserService();
  const navigation = useNavigation();

  const image = {
    uri: images.loginBackground,
  };

  const handleLogin = async () => {
    console.log(email, password);
    await userService.loginUser(email, password);
    setEmail("");
    setPassword("");
    navigation.navigate("HomeScreen");
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
          <View style={styles.containerForm}>
            <Formlogin
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              onLogin={() => handleLogin()}
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
  );
};

const styles = StyleSheet.create({
  containerImage: {
    flex: 1,
    justifyContent: "center",
  },
  containerLoginScreen: {
    flex: 1,
  },
  containerLogo: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  containerForm: {
    flex: 3,
  },
});
