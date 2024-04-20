import { createStackNavigator } from "@react-navigation/stack";
import { PathPickScreen } from "../pages/PathPickScreen";
import { LoginScreen } from "../pages/login/LoginScreen";
import { RegisterScreen } from "../pages/register/RegisterScreen";
import { HomeScreen } from "../pages/home/HomeScreen";
import { CategoriesScreen } from "../pages/categories/CategoriesScreen";
import { CategorySelectedScreen } from "../pages/categories/CategorySelectedScreen";
import { PlaylistScreen } from "../pages/playlists/PlaylistScreen";
import { PlaylistSelectedScreen } from "../pages/playlists/PlaylistSelectedScreen";
import { HelpScreen } from "../pages/help/HelpScreen";
import { SongSelectedScreen } from "../pages/songs/SongSelectedScreen";
import { ProfileScreen } from "../pages/profile/ProfileScreen";
import { SideMenuNavigator } from "./SideMenuNavigator";
import { BottomTabNavigator } from "./BottomTabNavigator";
import { HelpTopTabNavigator } from "./HelpTopTabNavigator";

export type RootStackParamsList = {
  PathPickScreen: undefined;
  LoginScreen: undefined;
  PlaylistScreen: undefined;
  PlaylistSelectedScreen: { id: number; title: string };
  RegisterScreen: undefined;
  HomeScreen: undefined;
  CategoriesScreen: undefined;
  CategorySelectedScreen: undefined;
  SongSelectedScreen: undefined;
  Tab: undefined;
  ProfileScreen: undefined;
  BottomTabNavigator: undefined;
  SideMenuNavigator: undefined;
  HelpScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamsList>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          elevation: 0,
          shadowColor: "transparent",
        },
      }}>
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Stack.Screen
        name="HelpTopTabNavigator"
        component={HelpTopTabNavigator}
      />
      <Stack.Screen name="SideMenuNavigator" component={SideMenuNavigator} />
      <Stack.Screen name="PathPickScreen" component={PathPickScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="HelpScreen" component={HelpScreen} />
      <Stack.Screen
        name="CategorySelectedScreen"
        component={CategorySelectedScreen}
      />
      <Stack.Screen name="PlaylistScreen" component={PlaylistScreen} />
      <Stack.Screen
        name="PlaylistSelectedScreen"
        component={PlaylistSelectedScreen}
      />
      <Stack.Screen name="SongSelectedScreen" component={SongSelectedScreen} />
    </Stack.Navigator>
  );
};
