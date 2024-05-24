import { ImageBackground, StyleSheet, View } from "react-native";
import { PrimaryButton } from "../components/shared/PrimaryButton";
import { globalColors, globalStyles } from "../theme/Theme";
import { images } from "../../assets/img/Images";
import { BrandLogo } from "../components/shared/BrandLogo";
import { RootStackParamsList } from "../routes/StackNavigator";
import { LinkLoginRegister } from "../components/shared/LinkLoginRegister";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { useUserService } from "../../context/UserServiceContext";

const backgroundImage = { uri: images.pathpickBackground };

export const PathPickScreen = () => {
  const userService = useUserService();
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

  const authWithGoogle = async () => {
    console.log("authWithGoogle");
    try {
      await userService.authUserGoogle();
      navigation.navigate("HomeScreen");
    } catch (err) {
      console.error("Error during Google authentication:", err);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.image}>
        <View style={globalStyles.overlay}>
          <View style={styles.layoutContent}>
            <BrandLogo />
            <View>
              <PrimaryButton
                label="REGISTER"
                bgColor={globalColors.primary}
                onPress={() => navigation.navigate("RegisterScreen")}
                colorText={globalColors.secondary}
                borderRadius={5}
                btnFontSize={25}
                marginBottom={30}
              />
              <PrimaryButton
                label="Facebook"
                bgColor={globalColors.info}
                onPress={() => console.log("facebook")}
                borderRadius={5}
                btnFontSize={20}
              />
              <PrimaryButton
                label="Google"
                bgColor={globalColors.warning}
                onPress={() => authWithGoogle()}
                borderRadius={5}
                btnFontSize={20}
              />
              <LinkLoginRegister
                text="Already have an account?"
                link="Login"
                goTo="LoginScreen"
              />
            </View>
          </View>
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
  layoutContent: {
    flex: 1,
    justifyContent: "space-evenly",
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
