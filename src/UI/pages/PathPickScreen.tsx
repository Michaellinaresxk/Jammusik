import { ImageBackground, StyleSheet, View } from "react-native";
import { PrimaryButton } from "../components/shared/PrimaryButton";
import { globalColors, globalStyles } from "../theme/Theme";
import { images } from "../../assets/img/Images";
import { BrandLogo } from "../components/shared/BrandLogo";
import { RootStackParamsList } from "../routes/StackNavigator";
import { LinkLoginRegister } from "../components/shared/LinkLoginRegister";
import { type NavigationProp, useNavigation } from "@react-navigation/native";

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
          <View style={styles.layoutContent}>
            <BrandLogo />
            <View>
              <PrimaryButton
                label="Register"
                bgColor={globalColors.primaryDark}
                onPress={() => navigation.navigate("RegisterScreen")}
              
                borderRadius={5}
                btnFontSize={20}
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
                onPress={() => console.log("google")}
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
