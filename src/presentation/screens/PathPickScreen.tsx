import { ImageBackground, StyleSheet, View } from "react-native";
import { PrimaryButton } from "../components/shared/PrimaryButton";
import { globalColors, globalStyles } from "../theme/Theme";
import { images } from "../../assets/img/Images";
import { BrandLogo } from "../components/shared/BrandLogo";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamsList } from "../routes/StackNavigator";
import { LinkLoginRegister } from "../components/shared/LinkLoginRegister";

const backgroundImage = { uri: images.pathpickBackground };

export const PathPickScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.image}>
        <View style={globalStyles.overlay}>
          <BrandLogo />
          <PrimaryButton
            label="REGISTER"
            bgColor={globalColors.primary}
            onPress={() => navigation.navigate("RegisterScreen")}
            colorText="white"
          />
          <PrimaryButton
            label="Facebook"
            bgColor={globalColors.info}
            onPress={() => console.log("facebook")}
          />
          <PrimaryButton
            label="Google"
            bgColor={globalColors.warning}
            onPress={() => console.log("google")}
          />
          <LinkLoginRegister text="Login" goTo="LoginScreen" />
          <LinkLoginRegister text="home" goTo="HomeScreen" />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  text: {
    color: "white",
    fontSize: 15,
    lineHeight: 84,
    textAlign: "center",
  },
  link: {
    fontWeight: "bold",
    color: globalColors.primary,
  },
});
export default PathPickScreen;
