import React from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalColors} from '../../../theme/Theme';

const AnimatedBlurHeader = ({
  title,
  scrollY,
  headerHeight = 60,
  scrollThreshold = 80,
  showBackButton = true,
}) => {
  const navigation = useNavigation();
  const paddingTop = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight || 0;

  const headerAnimatedStyle = {
    opacity: scrollY.interpolate({
      inputRange: [0, scrollThreshold],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        translateY: scrollY.interpolate({
          inputRange: [0, scrollThreshold],
          outputRange: [-headerHeight, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const backButtonAnimation = {
    opacity: scrollY.interpolate({
      inputRange: [0, scrollThreshold],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        translateX: scrollY.interpolate({
          inputRange: [0, scrollThreshold],
          outputRange: [-20, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return (
    <Animated.View
      style={[
        styles.headerContainer,
        {
          height: headerHeight + paddingTop,
        },
        headerAnimatedStyle,
      ]}>
      {/* Background with blur */}
      <View style={styles.backgroundLayerContainer}>
        <View
          style={[
            styles.headerBackground,
            Platform.OS === 'ios'
              ? styles.iosBackground
              : styles.androidBackground,
          ]}
        />
        <View style={styles.glassEffect} />
        <View style={styles.borderBottom} />
      </View>

      {/* Contents of the header */}
      <View style={[styles.headerContentContainer, {paddingTop}]}>
        <View
          style={[
            styles.headerRow,
            !showBackButton && styles.headerRowWithoutBack,
          ]}>
          {showBackButton ? (
            <Animated.View style={backButtonAnimation}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}>
                <Icon
                  name="arrow-back-outline"
                  size={24}
                  color={globalColors.light}
                />
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <View style={styles.emptySpace} />
          )}

          <Animated.Text
            style={[
              styles.headerTitle,
              !showBackButton && styles.headerTitleCentered,
            ]}
            numberOfLines={1}>
            {title}
          </Animated.Text>

          <View style={styles.emptySpace} />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  backgroundLayerContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  headerBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  iosBackground: {
    backgroundColor: 'rgba(20, 20, 20, 0.95)',
  },
  androidBackground: {
    backgroundColor: 'rgba(20, 20, 20, 0.90)',
  },
  glassEffect: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  borderBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 0.5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerContentContainer: {
    flex: 1,
    zIndex: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 16,
  },
  headerRowWithoutBack: {
    justifyContent: 'center', // Center when no back button
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: globalColors.light,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  headerTitleCentered: {
    flex: 0, // Remove flex when centered
    marginHorizontal: 0, // Remove margins when centered
  },
  emptySpace: {
    width: 40,
    height: 40,
  },
});

export default AnimatedBlurHeader;
