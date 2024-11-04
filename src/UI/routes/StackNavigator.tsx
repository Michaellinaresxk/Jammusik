import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../pages/login/LoginScreen';
import {RegisterScreen} from '../pages/register/RegisterScreen';
import {HomeScreen} from '../pages/home/HomeScreen';
// import { CategoriesScreen } from "../pages/categories/CategoriesScreen";
// import { CategorySelectedScreen } from "../pages/categories/CategorySelectedScreen";
// import { PlaylistScreen } from "../pages/playlists/PlaylistScreen";
// import { PlaylistSelectedScreen } from "../pages/playlists/PlaylistSelectedScreen";
// import { SongSelectedScreen } from "../pages/songs/SongSelectedScreen";
// import { ProfileScreen } from "../pages/profile/ProfileScreen";
import type {Song} from '../../types/songTypes';
import {FeedbackScreen} from '../pages/feedback/FeedbackScreen';
import useAuthStatus from '../../hooks/useAuthStatus';
import {AboutUsScreen} from '../pages/aboutUs/AboutUsScreen';
import {FaqsScreen} from '../pages/faqs/FaqsScreen';

export type RootStackParamsList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  PlaylistScreen: undefined;
  PlaylistSelectedScreen: Song;
  SongSelectedScreen: {title: string; artist: string};
  CategoriesScreen: {id: string; title: string};
  CategorySelectedScreen: Song;
  ProfileScreen: undefined;
  AboutUsScreen: undefined;
  FeedbackScreen: undefined;
  FaqsScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamsList>();

export const StackNavigator = () => {
  const {isLoggedIn} = useAuthStatus();

  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        },
      }}>
      {isLoggedIn ? (
        <Stack.Group>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          {/* <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
          <Stack.Screen
            name="CategorySelectedScreen"
            component={CategorySelectedScreen}
          />
          <Stack.Screen name="PlaylistScreen" component={PlaylistScreen} />
          <Stack.Screen
            name="PlaylistSelectedScreen"
            component={PlaylistSelectedScreen}
          />
          <Stack.Screen
            name="SongSelectedScreen"
            component={SongSelectedScreen}
          />
          <Stack.Screen name="FaqsScreen" component={FaqsScreen} />
          <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} /> */}
        </Stack.Group>
      ) : (
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
