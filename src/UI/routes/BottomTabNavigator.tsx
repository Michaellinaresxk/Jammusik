import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CategoriesScreen } from "../pages/categories/CategoriesScreen";
import { HomeScreen } from "../pages/home/HomeScreen";
import { globalColors } from "../theme/Theme";
import Icon from "react-native-vector-icons/Ionicons";

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
      <Tab.Screen name="Categories" component={CategoriesScreen} />
    </Tab.Navigator>
  );
};
