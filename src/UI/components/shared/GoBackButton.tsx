import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { RootStackParamsList } from "../../routes/StackNavigator";
import { globalColors } from "../../theme/Theme";
import { useRoute } from "@react-navigation/native";

export const GoBackButton = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  const route = useRoute();

  return (
    <Pressable
      style={
        route.name === "HomeScreen"
          ? styles.goBackDisable
          : styles.goBackContent
      }
      onPress={() => navigation.goBack()}>
      <Icon
        name="chevron-back-sharp"
        color={globalColors.primaryDark1}
        size={25}
      />
      <Text style={styles.goBackLabel}>Back</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  goBackContent: {
    fontSize: 15,
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
    position: "absolute",
    top: 60,
    marginLeft: 20,
  },
  goBackLabel: {
    fontSize: 15,
    color: globalColors.terceary,
  },
  goBackDisable: {
    display: "none",
  },
});
