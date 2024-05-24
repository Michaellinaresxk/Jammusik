import { createStackNavigator } from "@react-navigation/stack";
import { ProfileScreen } from "../pages/profile/ProfileScreen";
import { FeedbackScreen } from "../pages/feedback/FeedbackScreen";
import { AboutUsScreen } from "../pages/aboutUs/AboutUsScreen";
import { GuideScreen } from "../pages/guide/GuideScreen";
import { FaqsScreen } from "../pages/faqs/FaqsScreen";
import { SettingsScreen } from "../pages/settings/SettingsScreen";

export type RootStackParamsList = {
  PathPickScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;

  ProfileScreen: undefined;
  FeedbackScreen: undefined;
  AboutUsScreen: undefined;
  GuideScreen: undefined;
  FaqsScreen: undefined;
  SettingsScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamsList>();

export const StackSettingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
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
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerTitle: "Profile",
        }}
      />
      <Stack.Screen
        name="FeedbackScreen"
        component={FeedbackScreen}
        options={{
          headerTitle: "",


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
        name="GuideScreen"
        component={GuideScreen}
        options={{
          headerTitle: "Guide",
        }}
      />
      <Stack.Screen
        name="FaqsScreen"
        component={FaqsScreen}
        options={{
          headerTitle: "Faq",

        }}
      />
    </Stack.Navigator>
  );
};
