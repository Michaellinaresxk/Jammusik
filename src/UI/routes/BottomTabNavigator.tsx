import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../pages/home/HomeScreen";
import { globalColors } from "../theme/Theme";
import Icon from "react-native-vector-icons/Ionicons";
import { HelpScreen } from "../pages/help/HelpScreen";
// import { HelpTopTabNavigator } from "./HelpTopTabNavigator";

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          drawerIcon: () => (
            <Icon name="home-sharp" color={globalColors.light} size={20} />
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen name="HelpScreen" component={HelpScreen} />
      {/* <Tab.Screen name="HelpTopTabNavigator" component={HelpTopTabNavigator} /> */}
    </Tab.Navigator>
  );
};
