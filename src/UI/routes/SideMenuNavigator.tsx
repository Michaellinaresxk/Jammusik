import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { CategoriesScreen } from "../pages/categories/CategoriesScreen";
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
import {
  StackNavigator,
  type RootStackParamsList,
} from "../routes/StackNavigator";
import { FeedbackScreen } from "../pages/feedback/FeedbackScreen";
import useAuthStatus from "../../hooks/useAuthStatus";
import PathPickScreen from "../pages/PathPickScreen";
import { LoginScreen } from "../pages/login/LoginScreen";
import { RegisterScreen } from "../pages/register/RegisterScreen";
import { SettingsScreen } from "../pages/settings/SettingsScreen";

const Drawer = createDrawerNavigator();

export const SideMenuNavigator = () => {
  const { isLoggedIn } = useAuthStatus();
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName="HomeScreen"
      screenOptions={{
        drawerType: "slide",
        drawerActiveBackgroundColor: globalColors.primary,
        drawerActiveTintColor: globalColors.light,
        drawerInactiveTintColor: globalColors.terceary,
        drawerStyle: {
          backgroundColor: globalColors.secondary,
          flex: 1,
        },
        headerShown: false,
      }}>
      {isLoggedIn ? (
        <>
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
            component={StackNavigator}
          />
          <Drawer.Screen
            options={{
              drawerIcon: ({ focused }) => (
                <Icon
                  name="musical-notes-sharp"
                  color={focused ? globalColors.light : globalColors.terceary}
                  size={22}
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
                  name="settings-sharp"
                  color={focused ? globalColors.light : globalColors.terceary}
                  size={22}
                />
              ),
            }}
            name="Settings"
            component={SettingsScreen}
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
        </>
      ) : (
        <Drawer.Group screenOptions={{ headerShown: false }}>
          <Drawer.Screen name="PathPickScreen" component={PathPickScreen} />
          <Drawer.Screen name="LoginScreen" component={LoginScreen} />
          <Drawer.Screen name="RegisterScreen" component={RegisterScreen} />
        </Drawer.Group>
      )}
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
      navigation.navigate("PathPickScreen");
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
