/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { SideMenuNavigator } from "./presentation/routes/SideMenuNavigator";

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <SideMenuNavigator />
    </NavigationContainer>
  );
}

export default App;
