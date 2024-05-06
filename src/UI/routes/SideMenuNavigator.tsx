import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { CategoriesScreen } from "../pages/categories/CategoriesScreen";
import { HomeScreen } from "../pages/home/HomeScreen";
import { globalColors } from "../theme/Theme";
import { BrandLogo } from "../components/shared/BrandLogo";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryIcon } from "../components/shared/PrimaryIcon";
import { Separator } from "../components/shared/Separator";
import { PlaylistScreen } from "../pages/playlists/PlaylistScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { PrimaryButton } from "../components/shared/PrimaryButton";
import { useUserService } from "../../context/UserServiceContext";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { type RootStackParamsList } from "../routes/StackNavigator";
import { ProfileScreen } from "../pages/profile/ProfileScreen";
import { FeedbackScreen } from "../pages/feedback/FeedbackScreen";

const Drawer = createDrawerNavigator();

export const SideMenuNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: "slide",
        drawerActiveBackgroundColor: globalColors.primary,
        drawerActiveTintColor: globalColors.light,
        drawerInactiveTintColor: globalColors.terceary,
        drawerStyle: {
          backgroundColor: globalColors.secondary,
          flex: 1,
        },
      }}>
      <Drawer.Screen
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              name="home-sharp"
              color={focused ? globalColors.light : globalColors.terceary}
              size={20}
            />
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              name="options-sharp"
              color={focused ? globalColors.light : globalColors.terceary}
              size={20}
            />
          ),
        }}
        name="Playlist"
        component={PlaylistScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              name="grid-sharp"
              color={focused ? globalColors.light : globalColors.terceary}
              size={20}
            />
          ),
        }}
        name="Categories"
        component={CategoriesScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              name="id-card-sharp"
              color={focused ? globalColors.light : globalColors.terceary}
              size={23}
            />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              name="chatbox-ellipses-sharp"
              color={focused ? globalColors.light : globalColors.terceary}
              size={22}
            />
          ),
        }}
        name="Feedback"
        component={FeedbackScreen}
      />
    </Drawer.Navigator>
  );
};

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

  const userService = useUserService();
  const logoutUser = async () => {
    try {
      console.log("logout");
      await userService.logout();
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };
  return (
    <DrawerContentScrollView>
      <View style={styles.userIconContent}>
        <PrimaryIcon
          name="person-circle-outline"
          color={globalColors.primary}
        />
        <Text style={styles.userName}>User Name:</Text>
      </View>
      <Separator color="white" />
      <DrawerItemList {...props} />
      <View style={styles.buttonContainer}>
        <PrimaryButton
          label="Logout"
          onPress={() => logoutUser()}
          borderRadius={5}
          colorText={globalColors.primary}
          btnFontSize={17}
        />
      </View>
      <BrandLogo />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  userIconContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 30,
    marginBottom: 30,
  },
  userName: {
    color: globalColors.terceary,
    fontSize: 20,
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 50,
  },
  brandLogo: {
    position: "absolute",
    bottom: 0,
  },
});
