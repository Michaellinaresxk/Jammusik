/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { UserServiceProvider } from "./context/UserServiceContext";
import { ProviderComposer } from "./context/ProviderComposer";
import { categoryService } from "./services/categoryService";
import { CategoryServiceProvider } from "./context/CategoryServiceContext";
import { playlistService } from "./services/playlistService";
import { PlaylistServiceProvider } from "./context/PlaylistServiceContext";
import { songService } from "./services/songService";
import { SongServiceProvider } from "./context/SongServiceContext";
import { songWithOutPlaylistService } from "./services/songWithOutPlaylist";
import { SongWithOutPlaylistServiceProvider } from "./context/SongWithOutPlaylistContext";
import { songDetailsService } from "./services/songDetailsService";
import { SongDetailsServiceProvider } from "./context/SongDetailsServiceContext";
import { SideMenuNavigator } from "./UI/routes/SideMenuNavigator";
import { userService } from "./services/userService";
import Toast from "react-native-toast-message";
import { ToastConfig } from "./UI/theme/ToastConfig";
import { KeyboardProvider } from "react-native-keyboard-controller";

function App(): React.JSX.Element {
  return (
    <KeyboardProvider >
      <ProviderComposer
        contexts={[
          <UserServiceProvider userService={userService} />,
          <CategoryServiceProvider categoryService={categoryService} />,
          <PlaylistServiceProvider playlistService={playlistService} />,
          <SongWithOutPlaylistServiceProvider
            songWithOutPlaylistService={songWithOutPlaylistService}
          />,
          <SongServiceProvider songService={songService} />,
          <SongDetailsServiceProvider songDetailsService={songDetailsService} />,
          // Add other providers here as you create them
        ]}>

        <NavigationContainer>

          <SideMenuNavigator />


          <Toast config={ToastConfig} />
        </NavigationContainer>

      </ProviderComposer>
    </KeyboardProvider>
  );
}

export default App;
