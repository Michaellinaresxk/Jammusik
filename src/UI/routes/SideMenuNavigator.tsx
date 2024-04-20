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
    </Drawer.Navigator>
  );
};

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView>
      <View style={styles.userIconContent}>
        <PrimaryIcon
          name="person-circle-outline"
          color={globalColors.primary}
        />
        <Text style={styles.userName}> Michael</Text>
      </View>
      <Separator color="white" />
      <DrawerItemList {...props} />
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
  brandLogo: {
    position: "absolute",
    bottom: 0,
  },
});
