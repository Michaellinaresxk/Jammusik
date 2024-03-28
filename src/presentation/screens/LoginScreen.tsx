import { ImageBackground, StyleSheet, View } from "react-native";
import { PrimaryButton } from "../components/shared/PrimaryButton";
import { PrimaryIcon } from "../components/shared/PrimaryIcon";
import { globalColors, globalStyles } from "../theme/Theme";
import { Formlogin } from "../components/shared/FormLogin";

export const LoginScreen = () => {
  const image = {
    uri: "https://th.bing.com/th/id/OIP.4_mCu-7n0IvOe0y7dnNB-wHaE8?rs=1&pid=ImgDetMain",
  };

  return (
    <ImageBackground
      source={image}
      style={styles.containerImage}
      resizeMode="cover"
      alt="Imagen de fondo">
      <View style={styles.containerLoginScreen}>
        <View style={styles.containerLogo}>
          <PrimaryIcon name="rocket-outline" size={200} color={globalColors.primary}/>
        </View>
        <View style={styles.containerForm}>
          <Formlogin />
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

    backgroundColor: "black",
  },
  containerLogo: {
    flex: 1,

    backgroundColor: "blue",
  },
  containerForm: {
    flex: 2,

    backgroundColor: "black",
  },
});
