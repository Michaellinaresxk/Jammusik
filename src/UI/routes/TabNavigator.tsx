import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {Platform, StyleSheet, View} from 'react-native';
import {globalColors} from '../theme/Theme';
import {HomeScreen} from '../pages/home/HomeScreen';
import {CategoriesScreen} from '../pages/categories/CategoriesScreen';
import {PlaylistScreen} from '../pages/playlists/PlaylistScreen';
import {SettingsScreen} from '../pages/settings/SettingsScreen';
import React from 'react';

const Tab = createBottomTabNavigator();

export type TabNavigatorParamsList = {
  Home: undefined;
  Categories: undefined;
  Playlists: undefined;
  Settings: undefined;
  CategorySelectedScreen: {id: string; title: string};
  PlaylistSelectedScreen: {id: string; title: string};
  SongSelectedScreen: {title: string; artist: string};
};

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: globalColors.primary,
        tabBarInactiveTintColor: globalColors.terceary,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarBackground: () => <View style={styles.tabBarBackground} />,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.iconContainerFocused,
              ]}>
              <Icon
                name={focused ? 'home-sharp' : 'home-outline'}
                color={focused ? globalColors.primary : color}
                size={24}
              />
            </View>
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.iconContainerFocused,
              ]}>
              <Icon
                name={focused ? 'grid-sharp' : 'grid-outline'}
                color={focused ? globalColors.primary : color}
                size={24}
              />
            </View>
          ),
          tabBarLabel: 'Categories',
        }}
      />
      <Tab.Screen
        name="Playlists"
        component={PlaylistScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.iconContainerFocused,
              ]}>
              <Icon
                name={focused ? 'musical-notes-sharp' : 'musical-notes-outline'}
                color={focused ? globalColors.primary : color}
                size={24}
              />
            </View>
          ),
          tabBarLabel: 'Playlists',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.iconContainerFocused,
              ]}>
              <Icon
                name={focused ? 'settings-sharp' : 'settings-outline'}
                color={focused ? globalColors.primary : color}
                size={24}
              />
            </View>
          ),
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 0 : 16,
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    paddingBottom: 0,
    overflow: 'hidden',
  },
  tabBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: globalColors.secondary,
    borderRadius: 20,
    // Agregar un sutil gradiente o efecto de glassmorphism
    opacity: 0.95,
  },
  tabBarLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 3,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 8,
  },
  iconContainerFocused: {
    backgroundColor: `${globalColors.secondary}50`,
    transform: [{scale: 1.1}],
    shadowColor: globalColors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});
