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
import { ProviderComposer } from "./context/ProviderComposer";
import { categoryService } from "./services/categoryService";
import { CategoryServiceProvider } from "./context/CategoryServiceContext";

function App(): React.JSX.Element {
  return (
    <ProviderComposer
      contexts={[
        <UserServiceProvider userService={userService} />,
        <CategoryServiceProvider categoryService={categoryService} />,
        // Add other providers here as you create them
      ]}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </ProviderComposer>
  );
}

export default App;
