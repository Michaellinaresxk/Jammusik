import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { globalColors, globalStyles } from "../../theme/Theme";
import { images } from "../../../assets/img/Images";
import { BrandLogo } from "../../components/shared/BrandLogo";
import { FormRegister } from "../../components/shared/FormRegister";
import React from "react";
import { LinkLoginRegister } from "../../components/shared/LinkLoginRegister";

export const RegisterScreen = () => {
  const image = {
    uri: images.loginBackground,
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
            <FormRegister />
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
