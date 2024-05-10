import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PlaylistScreen } from "../pages/playlists/PlaylistScreen";
import { globalColors } from "../theme/Theme";


const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarStyle: { backgroundColor: globalColors.secondary },
        tabBarActiveTintColor: globalColors.primary,
      }}>
      <Tab.Screen name="Home" component={SideMenuNavigator} />

      <Tab.Screen name="Playlists" component={PlaylistScreen} />
    </Tab.Navigator>
  );
};
