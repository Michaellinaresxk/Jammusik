/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
// import {SafeAreaView, ScrollView, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {userService} from './src/services/userService';
import {UserServiceProvider} from './src/context/UserServiceContext';
import {ProviderComposer} from './src/context/ProviderComposer';
import {categoryService} from './src/services/categoryService';
import {CategoryServiceProvider} from './src/context/CategoryServiceContext';
import {playlistService} from './src/services/playlistService';
import {PlaylistServiceProvider} from './src/context/PlaylistServiceContext';
import {songService} from './src/services/songService';
import {SongServiceProvider} from './src/context/SongServiceContext';
import {songDetailsService} from './src/services/songDetailsService';
import {SongDetailsServiceProvider} from './src/context/SongDetailsServiceContext';
import {SideMenuNavigator} from './src/UI/routes/SideMenuNavigator';

import Toast from 'react-native-toast-message';
import {ToastConfig} from './src/UI/theme/ToastConfig';

function App(): React.JSX.Element {
  return (
    <ProviderComposer
      contexts={[
        <UserServiceProvider userService={userService} />,
        <CategoryServiceProvider categoryService={categoryService} />,
        <PlaylistServiceProvider playlistService={playlistService} />,
        <SongServiceProvider songService={songService} />,
        <SongDetailsServiceProvider songDetailsService={songDetailsService} />,
        // Add other providers here as you create them
      ]}>
      <NavigationContainer>
        <SideMenuNavigator />
        <Toast config={ToastConfig} />
      </NavigationContainer>
    </ProviderComposer>
  );
}

export default App;
