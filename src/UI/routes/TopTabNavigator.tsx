import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { HomeScreen } from "../pages/home/HomeScreen";
import { ProfileScreen } from "../pages/profile/ProfileScreen";
import { HamburgerMenu } from "../components/shared/HamburgerMenu";

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  return (
    <>
      <HamburgerMenu />
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarLabel: "home" }}
        />
        <Tab.Screen
          name="cagegoy"
          component={ProfileScreen}
          options={{ tabBarLabel: "category" }}
        />
      </Tab.Navigator>
    </>
  );
};

export default TopTabNavigator;
