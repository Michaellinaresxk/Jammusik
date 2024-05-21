import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MenuItem } from "../../components/shared/MenuItem";
import { BrandLogo } from "../../components/shared/BrandLogo";
import Icon from "react-native-vector-icons/Ionicons";
import { globalColors } from "../../theme/Theme";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { PrimaryButton } from "../../components/shared/PrimaryButton";
import { useUserService } from "../../../context/UserServiceContext";
import { RootStackParamsList } from "../../routes/StackNavigator";

export const SettingsScreen = () => {
  const { top } = useSafeAreaInsets();

  const profileItems = [
    {
      name: "Profile",
      icon: "construct-sharp",
      component: "ProfileScreen",
    },
    {
      name: "About us",
      icon: "play-sharp",
      component: "AboutUsScreen",
    },
  ];

  const menuItems = [
    {
      name: "Guide",
      icon: "rocket-sharp",
      component: "GuideScreen",
    },
    {
      name: "FAQ's",
      icon: "help-sharp",
      component: "FaqsScreen",
    },
  ];

  const menuQuestions = [
    {
      name: "FeedBack",
      icon: "chatbox-ellipses-sharp",
      component: "FeedbackScreen",
    },
  ];

  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

  const userService = useUserService();
  const logoutUser = async () => {
    try {
      console.log("logout");
      await userService.logout();
      navigation.navigate("PathPickScreen");
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        marginTop: top,
      }}>
      <Pressable
        style={styles.goBackContent}
        onPress={() => navigation.navigate("HomeScreen")}>
        <Icon
          name="chevron-back-sharp"
          color={globalColors.primaryDark1}
          size={25}
        />
        <Text style={styles.goBackLabel}>Back</Text>
      </Pressable>
      <View style={styles.mainContainer}>
        {profileItems.map((item, index) => (
          <MenuItem
            key={item.component}
            {...item}
            isFirst={index === 0}
            isLast={index === menuItems.length - 1}
          />
        ))}
        <View style={{ marginTop: 30 }} />

        {menuItems.map((item, index) => (
          <MenuItem
            key={item.component}
            {...item}
            isFirst={index === 0}
            isLast={index === menuItems.length - 1}
          />
        ))}
        <View style={{ marginTop: 30 }} />

        {menuQuestions.map((item, index) => (
          <MenuItem
            key={item.component}
            {...item}
            isFirst={index === 0}
            isLast={index === menuItems.length - 1}
          />
        ))}
        <View style={{ marginTop: 30 }} />
        <View style={styles.buttonContainer}>
          <PrimaryButton
            label="Logout"
            onPress={() => logoutUser()}
            borderRadius={5}
            colorText={globalColors.danger}
            btnFontSize={17}
            bgColor={globalColors.dangerAlt}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <BrandLogo />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 40,
  },
  goBackContent: {
    fontSize: 15,
    fontWeight: "bold",
    margin: "auto",
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  goBackLabel: {
    fontSize: 20,
    color: globalColors.terceary,
    fontWeight: "bold",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 50,
  },
});
