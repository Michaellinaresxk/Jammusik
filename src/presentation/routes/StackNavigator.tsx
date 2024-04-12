import { createStackNavigator } from "@react-navigation/stack";
import { PathPickScreen } from "../screens/PathPickScreen";
import { LoginScreen } from "../screens/login/LoginScreen";
import { RegisterScreen } from "../screens/register/RegisterScreen";
import { HomeScreen } from "../screens/home/HomeScreen";
import { CategoriesScreen } from "../screens/categories/CategoriesScreen";
import { CategorySelectedScreen } from "../screens/categories/CategorySelectedScreen";
import { PlaylistScreen } from "../screens/playlists/PlaylistScreen";
import { PlaylistSelectedScreen } from "../screens/playlists/PlaylistSelectedScreen";
import { SongSelectedScreen } from "../screens/songs/SongSelectedScreen";
import { ProfileScreen } from "../screens/profile/ProfileScreen";

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
      <Stack.Screen name="PathPickScreen" component={PathPickScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
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
