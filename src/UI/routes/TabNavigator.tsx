import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {Platform, StyleSheet} from 'react-native';
import {globalColors} from '../theme/Theme';
import {HomeScreen} from '../pages/home/HomeScreen';
import {CategoriesScreen} from '../pages/categories/CategoriesScreen';
import {PlaylistScreen} from '../pages/playlists/PlaylistScreen';
import {SettingsScreen} from '../pages/settings/SettingsScreen';
import React from 'react';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: globalColors.primary,
        tabBarInactiveTintColor: globalColors.terceary,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home-outline" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="grid-outline" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Playlists"
        component={PlaylistScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="musical-notes-outline" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="settings-outline" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    left: 20,
    right: 20,
    height: 60,
    borderRadius: 15,
    backgroundColor: globalColors.secondary,
    borderTopWidth: 0,
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    paddingBottom: 0,
  },
});
