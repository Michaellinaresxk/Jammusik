import { createStackNavigator } from "@react-navigation/stack";
import { PathPickScreen } from "../screens/PathPickScreen";
import { LoginScreen } from "../screens/login/LoginScreen";
import { RegisterScreen } from "../screens/register/RegisterScreen";
import { HomeScreen } from "../screens/home/HomeScreen";
import { CategoriesScreen } from "../screens/categories/CategoriesScreen";
import { CategoryScreen } from "../screens/categories/CategorySelectedScreen";
import { PlaylistScreen } from "../screens/playlists/PlaylistScreen";

export type RootStackParamsList = {
  PathPickScreen: undefined;
  LoginScreen: undefined;
  // Playlists: {id: number; name: string};
  PlaylistScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  CategoriesScreen: undefined;
  CategoryScreen: { id: number; title: string };
  Tab: undefined;
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
      <Stack.Screen name="PlaylistScreen" component={PlaylistScreen} />
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
    </Stack.Navigator>
  );
};
