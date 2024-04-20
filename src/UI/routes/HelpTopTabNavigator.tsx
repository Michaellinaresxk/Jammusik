import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { HomeScreen } from "../pages/home/HomeScreen";
import { PlaylistScreen } from "../pages/playlists/PlaylistScreen";

const Tab = createMaterialTopTabNavigator();

export const HelpTopTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Playlist" component={PlaylistScreen} />
    </Tab.Navigator>
  );
};
