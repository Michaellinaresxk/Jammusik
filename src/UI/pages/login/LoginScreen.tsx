import { ImageBackground, StyleSheet, Text, View } from "react-native";
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

  const userService = useUserService();
  const navigation = useNavigation();

  const image = {
    uri: images.loginBackground,
  };

  const handleLogin = async () => {
    console.log(email, password);
    const res = await userService.loginUser(email, password);

    console.log(res);
    setEmail("");
    setPassword("");
    navigation.navigate("HomeScreen");
  };

  return (
    <ImageBackground source={image} resizeMode="cover" alt="Imagen de fondo">
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
  containerLoginScreen: {
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
    marginTop: -100,
  },
  containerForm: {
    flex: 3,
  },
});
