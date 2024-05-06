import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PlaylistScreen } from "../pages/playlists/PlaylistScreen";
import { globalColors } from "../theme/Theme";
import { SideMenuNavigator } from "./SideMenuNavigator";

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarStyle: { backgroundColor: globalColors.secondary },
        tabBarActiveTintColor: globalColors.primary,
      }}>
      <Tab.Screen name="SideMenuNavigator" component={SideMenuNavigator} />

      <Tab.Screen name="Playlists" component={PlaylistScreen} />
    </Tab.Navigator>
  );
};
