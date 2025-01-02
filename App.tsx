/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
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

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
