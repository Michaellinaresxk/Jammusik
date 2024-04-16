/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./UI/routes/StackNavigator";
import { UserServiceProvider } from "./context/UserServiceContext";
import { userService } from "./services/userService";
import { ProviderComposer } from "./context/ProviderComposer";
import { categoryService } from "./services/categoryService";
import { CategoryServiceProvider } from "./context/CategoryServiceContext";
import { playlistService } from "./services/playlistService";
import { PlaylistServiceProvider } from "./context/PlaylistServiceContext";
import { songService } from "./services/songService";
import { SongServiceProvider } from "./context/SongServiceContext";

function App(): React.JSX.Element {
  return (
    <ProviderComposer
      contexts={[
        <UserServiceProvider userService={userService} />,
        <CategoryServiceProvider categoryService={categoryService} />,
        <PlaylistServiceProvider playlistService={playlistService} />,
        <SongServiceProvider songService={songService} />,
        // Add other providers here as you create them
      ]}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </ProviderComposer>
  );
}

export default App;
