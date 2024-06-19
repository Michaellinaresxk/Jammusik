import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { CategoriesScreen } from "../pages/categories/CategoriesScreen";
import { globalColors } from "../theme/Theme";
import { BrandLogo } from "../components/shared/BrandLogo";
import { Alert, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Separator } from "../components/shared/Separator";
import { PlaylistScreen } from "../pages/playlists/PlaylistScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { useUserService } from "../../context/UserServiceContext";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import {
  StackNavigator,
  type RootStackParamsList,
} from "../routes/StackNavigator";
import useAuthStatus from "../../hooks/useAuthStatus";
import { LoginScreen } from "../pages/login/LoginScreen";
import { RegisterScreen } from "../pages/register/RegisterScreen";
import { StackSettingNavigator } from "./StackSettingNavigator";
import { UserAvatar } from "../components/shared/UserAvatar";

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
            component={StackSettingNavigator}
          />
        </>
      ) : (
        <Drawer.Group screenOptions={{ headerShown: false }}>
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
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

  const logOutConfirmation = () =>
    Alert.alert("Are you sure?", "Do you want to log-out?", [
      {
        text: "UPS! BY MISTAKE",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "YES, LOG-OUT",
        onPress: () => logoutUser(),
        style: "destructive",
      },
    ]);

  return (
    <DrawerContentScrollView>
      <UserAvatar />
      <Separator color="white" />
      <DrawerItemList {...props} />
      <View style={styles.buttonContainer}>


        <TouchableOpacity style={styles.btnContainer}

          onPress={() => logOutConfirmation()}>
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 100 }}>
        <BrandLogo />
      </View>
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
    marginTop: 100,
    marginBottom: 50,
  },
  brandLogo: {
    position: "absolute",
    bottom: 0,
  },
  btnContainer: {
    backgroundColor: 'transparent',
    width: 100,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: globalColors.primary,

    alignSelf: 'center'
  },
  btnText: {

    color: globalColors.primary,
    margin: 'auto',
    textAlign: 'center'

  }
});
