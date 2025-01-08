/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {userService} from './src/services/userService';
import {categoryService} from './src/services/categoryService';
import {playlistService} from './src/services/playlistService';
import {songService} from './src/services/songService';
import {songDetailsService} from './src/services/songDetailsService';
import {ProviderComposer} from './src/context/ProviderComposer';
import {UserServiceProvider} from './src/context/UserServiceContext';
import {CategoryServiceProvider} from './src/context/CategoryServiceContext';
import {PlaylistServiceProvider} from './src/context/PlaylistServiceContext';
import {SongServiceProvider} from './src/context/SongServiceContext';
import {SongDetailsServiceProvider} from './src/context/SongDetailsServiceContext';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigator} from './src/UI/routes/AppNavigator';
import {ToastConfig} from './src/UI/theme/ToastConfig';
import Toast from 'react-native-toast-message';

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
        <AppNavigator />
        <Toast config={ToastConfig} />
      </NavigationContainer>
    </ProviderComposer>
  );
}

export default App;
