import { createStackNavigator } from "@react-navigation/stack";
import { ProfileScreen } from "../pages/profile/ProfileScreen";
import { FeedbackScreen } from "../pages/feedback/FeedbackScreen";
import { AboutUsScreen } from "../pages/aboutUs/AboutUsScreen";
import { FaqsScreen } from "../pages/faqs/FaqsScreen";
import { SettingsScreen } from "../pages/settings/SettingsScreen";
import { DeleteAccountScreen } from "../pages/deleteAccount/DeleteAccountScreen";

export type RootStackParamsList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;

  ProfileScreen: undefined;
  FeedbackScreen: undefined;
  AboutUsScreen: undefined;
  FaqsScreen: undefined;
  SettingsScreen: undefined;
  DeleteAccountScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamsList>();

export const StackSettingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          elevation: 0,
          shadowColor: "transparent",
        },
        headerTitle: "Settings",
      }}>
      <Stack.Screen
        name="SettingScreen"
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileScreenF"
        component={ProfileScreen}
        options={{
          headerTitle: "Profile",
        }}
      />
      <Stack.Screen
        name="FeedbackScreen"
        component={FeedbackScreen}
        options={{
          headerTitle: "Feedback",
        }}
      />
      <Stack.Screen
        name="AboutUsScreen"
        component={AboutUsScreen}
        options={{
          headerTitle: "About",
        }}
      />
      <Stack.Screen
        name="FaqsScreen"
        component={FaqsScreen}
        options={{
          headerTitle: "Faq",
        }}
      />
      <Stack.Screen
        name="DeleteAccountScreen"
        component={DeleteAccountScreen}
        options={{
          headerTitle: "DeleteAccountScreen",
        }}
      />
    </Stack.Navigator>
  );
};
