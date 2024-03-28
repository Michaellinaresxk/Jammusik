import { Text, View } from "react-native";
import { PrimaryButton } from "../components/shared/PrimaryButton";
import { PrimaryIcon } from "../components/shared/PrimaryIcon";
import { globalStyles } from "../../config/theme/Theme";

export const LoginScreen = () => {
  return (
    <View style={globalStyles.container}>
      <PrimaryIcon name="rocket-outline" size={30} color="#900" />
      <PrimaryButton label="SUBMIT" />
    </View>
  );
};
