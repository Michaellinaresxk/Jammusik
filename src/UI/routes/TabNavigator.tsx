import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, StyleSheet, View, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React, {useRef, useEffect} from 'react';
import {HomeScreen} from '../pages/home/HomeScreen';
import {CategoriesScreen} from '../pages/categories/CategoriesScreen';
import {PlaylistScreen} from '../pages/playlists/PlaylistScreen';
import {SettingsScreen} from '../pages/settings/SettingsScreen';
import {ExploreScreen} from '../pages/explore/ExploreScreen';
import {globalColors} from '../theme/Theme';

const Tab = createBottomTabNavigator();

// Improved types for better type safety
export type TabNavigatorParamsList = {
  Home: undefined;
  Categories: undefined;
  Playlists: undefined;
  Settings: undefined;
  ExploreScreen: undefined;
  CategorySelectedScreen: {id: string; title: string};
  PlaylistSelectedScreen: {id: string; title: string};
  SongSelectedScreen: {title: string; artist: string};
};

interface TabBarIconProps {
  focused: boolean;
  color: string;
  name: string;
}

// Component for tab icon with animations
const AnimatedTabBarIcon: React.FC<TabBarIconProps> = ({
  focused,
  color,
  name,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: focused ? 1.2 : 1,
        useNativeDriver: true,
        friction: 8,
      }),
      Animated.timing(opacityAnim, {
        toValue: focused ? 1 : 0.6,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [focused, opacityAnim, scaleAnim]);

  return (
    <Animated.View
      style={[
        styles.iconContainer,
        {
          transform: [{scale: scaleAnim}],
          opacity: opacityAnim,
        },
      ]}>
      <Icon
        name={focused ? `${name}-sharp` : `${name}-outline`}
        color={focused ? globalColors.primary : color}
        size={24}
      />
    </Animated.View>
  );
};

// Background component with glassmorphism effect
const GlassmorphicBackground: React.FC = () => (
  <View style={styles.tabBarBackground}>
    <View style={styles.glassEffect} />
  </View>
);

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: globalColors.primary,
        tabBarInactiveTintColor: globalColors.terceary,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '400',
          marginTop: 2, // Reduced space between icon and label
        },
        tabBarItemStyle: {
          height: Platform.OS === 'ios' ? 50 : 60,
          paddingTop: 8, // Reduced top padding to move icons up
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
        },
        tabBarBackground: () => <GlassmorphicBackground />,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <AnimatedTabBarIcon focused={focused} color={color} name="home" />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <AnimatedTabBarIcon focused={focused} color={color} name="rocket" />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <AnimatedTabBarIcon focused={focused} color={color} name="grid" />
          ),
        }}
      />
      <Tab.Screen
        name="Playlists"
        component={PlaylistScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <AnimatedTabBarIcon
              focused={focused}
              color={color}
              name="musical-notes"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <AnimatedTabBarIcon
              focused={focused}
              color={color}
              name="settings"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 85 : 60,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  tabBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor:
      Platform.OS === 'ios'
        ? 'rgba(20, 20, 20, 0.95)'
        : 'rgba(20, 20, 20, 0.90)',
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    borderTopWidth: 0.5,
  },
  glassEffect: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  iconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
