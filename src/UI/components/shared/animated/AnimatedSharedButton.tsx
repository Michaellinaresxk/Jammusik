import React, {useEffect, useRef} from 'react';
import {TouchableOpacity, Text, View, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalColors} from '../../../theme/Theme';

export const AnimatedSharedButton = ({
  navigation,
  hasSharedPlaylists,
  style,
  buttonTextStyle,
}) => {
  // Create animated value for translation
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let animationLoop: Animated.CompositeAnimation;

    if (hasSharedPlaylists) {
      // Create the shake animation sequence
      const sequence = Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 3,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -3,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 3,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]);

      // Create a loop with delay
      animationLoop = Animated.loop(
        Animated.sequence([
          sequence,
          Animated.delay(2500), // Wait 3 seconds before next animation
        ]),
      );

      // Start the animation
      animationLoop.start();
    }

    // Cleanup
    return () => {
      if (animationLoop) {
        animationLoop.stop();
      }
    };
  }, [hasSharedPlaylists, shakeAnimation]);

  return (
    <Animated.View
      style={{
        transform: [{translateX: shakeAnimation}],
      }}>
      <TouchableOpacity
        style={[style]}
        onPress={() => navigation.navigate('SharedPlaylistsScreen')}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="share-social" size={24} color={globalColors.primary} />
          <Text style={[buttonTextStyle]}>Shared Playlists</Text>
          {hasSharedPlaylists && (
            <View
              style={{
                backgroundColor: globalColors.primary,
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 8,
              }}
            />
          )}
        </View>
        <Icon
          name="chevron-forward-outline"
          color={globalColors.primary}
          style={{marginLeft: 'auto'}}
          size={25}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};
