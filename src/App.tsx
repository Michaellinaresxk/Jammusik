/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./presentation/routes/StackNavigator";
import { UserServiceProvider } from "./context/UserServiceContext";
import { userService } from "./services/userService";

function App(): React.JSX.Element {
  return (
    <UserServiceProvider userService={userService}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </UserServiceProvider>
  );
}

export default App;
