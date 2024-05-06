import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PlaylistScreen } from "../pages/playlists/PlaylistScreen";
import { globalColors } from "../theme/Theme";
import Icon from "react-native-vector-icons/Ionicons";
import { SideMenuNavigator } from "./SideMenuNavigator";
const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Icon name="home-sharp" color={globalColors.light} size={20} />
          ),
        }}
        name="Home"
        component={SideMenuNavigator}
      />
      <Tab.Screen name="Playlists" component={PlaylistScreen} />
    </Tab.Navigator>
  );
};
