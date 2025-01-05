import {createStackNavigator} from '@react-navigation/stack';
import {TabNavigator} from './TabNavigator';
import {LoginScreen} from '../pages/login/LoginScreen';
import {RegisterScreen} from '../pages/register/RegisterScreen';
import {ProfileScreen} from '../pages/profile/ProfileScreen';
import {FeedbackScreen} from '../pages/feedback/FeedbackScreen';
import {AboutUsScreen} from '../pages/aboutUs/AboutUsScreen';
import {FaqsScreen} from '../pages/faqs/FaqsScreen';
import {DeleteAccountScreen} from '../pages/deleteAccount/DeleteAccountScreen';
import useAuthStatus from '../../hooks/useAuthStatus';
import {globalColors} from '../theme/Theme';
import React from 'react';
import {CategorySelectedScreen} from '../pages/categories/CategorySelectedScreen';
import {PlaylistSelectedScreen} from '../pages/playlists/PlaylistSelectedScreen';
import {SongSelectedScreen} from '../pages/songs/SongSelectedScreen';
import {ExploreScreen} from '../pages/explore/ExploreScreen';

export type RootStackParamsList = {
  MainTabs: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ProfileScreen: undefined;
  FeedbackScreen: undefined;
  AboutUsScreen: undefined;
  FaqsScreen: undefined;
  ExploreScreen: undefined;
  DeleteAccountScreen: undefined;
  CategorySelectedScreen: {id: string; title: string};
  PlaylistSelectedScreen: {id: string; title: string};
  SongSelectedScreen: {title: string; artist: string};
};

const Stack = createStackNavigator<RootStackParamsList>();

export const AppNavigator = () => {
  const {isLoggedIn} = useAuthStatus();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: globalColors.light,
        headerStyle: {
          backgroundColor: globalColors.secondary,
          elevation: 0,
          shadowColor: 'transparent',
        },
        headerBackTitle: 'Back',
      }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="MainTabs"
            component={TabNavigator}
            options={{headerShown: false}}
          />

          {/* Rutas de Settings */}
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{
              headerTitle: 'Profile',
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="FeedbackScreen"
            component={FeedbackScreen}
            options={{
              headerTitle: 'Feedback',
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="AboutUsScreen"
            component={AboutUsScreen}
            options={{
              headerTitle: 'About Us',
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="FaqsScreen"
            component={FaqsScreen}
            options={{
              headerTitle: 'FAQs',
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="DeleteAccountScreen"
            component={DeleteAccountScreen}
            options={{
              headerTitle: 'Delete Account',
              headerShown: true,
            }}
          />

          {/* Rutas de Contenido */}
          <Stack.Screen
            name="CategorySelectedScreen"
            component={CategorySelectedScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PlaylistSelectedScreen"
            component={PlaylistSelectedScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SongSelectedScreen"
            component={SongSelectedScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ExploreScreen"
            component={ExploreScreen}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
