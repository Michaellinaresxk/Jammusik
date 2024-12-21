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
        tabBarShowLabel: true, // Show text labels
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: globalColors.primary, // Color when active
        tabBarInactiveTintColor: globalColors.terceary, // Color when inactive
        tabBarLabelStyle: styles.tabBarLabel,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Icon
              name={focused ? 'home-sharp' : 'home-outline'} // Switch to “sharp” when active
              color={color}
              size={24}
            />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Icon
              name={focused ? 'grid-sharp' : 'grid-outline'}
              color={color}
              size={24}
            />
          ),
          tabBarLabel: 'Categories',
        }}
      />
      <Tab.Screen
        name="Playlists"
        component={PlaylistScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Icon
              name={focused ? 'musical-notes-sharp' : 'musical-notes-outline'}
              color={color}
              size={24}
            />
          ),
          tabBarLabel: 'Playlists',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Icon
              name={focused ? 'settings-sharp' : 'settings-outline'}
              color={color}
              size={24}
            />
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
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: -2,
    marginBottom: 8,
  },
});
