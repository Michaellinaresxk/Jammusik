import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, StyleSheet, View, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React, {useRef, useEffect} from 'react';
import {HomeScreen} from '../pages/home/HomeScreen';
import {CategoriesScreen} from '../pages/categories/CategoriesScreen';
import {PlaylistScreen} from '../pages/playlists/PlaylistScreen';
import {SettingsScreen} from '../pages/settings/SettingsScreen';
import {globalColors} from '../theme/Theme';

const Tab = createBottomTabNavigator();

// Tipos mejorados para mejor type safety
export type TabNavigatorParamsList = {
  Home: undefined;
  Categories: undefined;
  Playlists: undefined;
  Settings: undefined;
  CategorySelectedScreen: {id: string; title: string};
  PlaylistSelectedScreen: {id: string; title: string};
  SongSelectedScreen: {title: string; artist: string};
};

interface TabBarIconProps {
  focused: boolean;
  color: string;
  name: string;
}

// Componente para el icono del tab con animaciones
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
      {focused && <View style={styles.activeIndicator} />}
    </Animated.View>
  );
};

// Componente para el fondo con efecto glassmorphism
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
        tabBarLabelStyle: styles.tabBarLabel,
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
    bottom: Platform.OS === 'ios' ? 34 : 24,
    left: 20,
    right: 20,
    height: 65,
    borderRadius: 15,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    paddingBottom: 0,
    overflow: 'hidden',
  },
  tabBarBackground: {
    position: 'absolute',
    top: 0,
    left: 10,
    right: 10,
    bottom: 0,
    borderRadius: 20,
    backgroundColor: `${globalColors.secondary}`,
  },
  glassEffect: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 25,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: Platform.OS === 'ios' ? 0 : 4,
    marginTop: 8,
    letterSpacing: 0.5,
  },
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 15,
  },
});
