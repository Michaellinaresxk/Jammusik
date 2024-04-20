import React, { useEffect } from "react";
import { Pressable, Text } from "react-native";
import {
  type NavigationProp,
  useNavigation,
  DrawerActions,
} from "@react-navigation/native";
import { RootStackParamsList } from "../../routes/StackNavigator";

export const HamburgerMenu = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}>
          <Text>Menu</Text>
        </Pressable>
      ),
    });
  }, [navigation]);
  return <></>;
};
