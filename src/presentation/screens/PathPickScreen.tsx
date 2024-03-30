import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../components/shared/PrimaryButton";
import { globalColors, globalStyles } from "../theme/Theme";
import { images } from "../../assets/img/Images";
import { BrandLogo } from "../components/shared/BrandLogo";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamsList } from "../routes/StackNavigator";

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
          />
          <PrimaryButton label="Facebook" bgColor={globalColors.info} />
          <PrimaryButton label="Google" bgColor={globalColors.warning} />
          <Text style={styles.text}>
            Already have an account?{" "}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("LoginScreen")}>
              LOGIN
            </Text>
          </Text>
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("CategoriesScreen")}>
            category
          </Text>
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
