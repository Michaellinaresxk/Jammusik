import { createStackNavigator } from "@react-navigation/stack";
import { PathPickScreen } from "../screens/PathPickScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";

export type RootStackParamsList = {
  PathPickScreen: undefined;
  LoginScreen: undefined;
  // Playlists: {id: number; name: string};
  RegisterScreen: undefined;
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
    </Stack.Navigator>
  );
};
