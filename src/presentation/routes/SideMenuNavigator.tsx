import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { CategoriesScreen } from "../screens/CategoriesScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { PathPickScreen } from "../screens/PathPickScreen";
import { globalColors } from "../theme/Theme";
import { BrandLogo } from "../components/shared/BrandLogo";
import { Text, View } from "react-native";

const Drawer = createDrawerNavigator();

export const SideMenuNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: "slide",
        drawerActiveBackgroundColor: globalColors.primary,
        drawerActiveTintColor: globalColors.light,
      }}>
      <Drawer.Screen name="PickPathScreen" component={PathPickScreen} />
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="CategoriesScreen" component={CategoriesScreen} />
    </Drawer.Navigator>
  );
};

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView>
      <View>
        <Text>Hola</Text>
      </View>
      <DrawerItemList {...props} />
      <BrandLogo />
    </DrawerContentScrollView>
  );
};
