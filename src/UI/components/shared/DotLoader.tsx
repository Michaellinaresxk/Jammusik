import React, {useEffect, useRef} from 'react';
import {View, Animated, StyleSheet, Easing} from 'react-native';

const DotLoader = () => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotation, {
            toValue: 1,
            duration: 1000,
            easing: Easing.bezier(0.49, 0.06, 0.43, 0.85),
            useNativeDriver: false,
          }),
          Animated.timing(rotation, {
            toValue: 0,
            duration: 1000,
            easing: Easing.bezier(0.49, 0.06, 0.43, 0.85),
            useNativeDriver: false,
          }),
        ]),
      ).start();
    };

    animate();
  }, []);

  const interpolateRotation = rotation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '50deg', '0deg'],
  });

  const interpolateTranslateZ = rotation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [-25, 0, -25],
  });

  const interpolateColor1 = rotation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#1e3f57', '#1e574f', '#1e3f57'],
  });

  const interpolateColor2 = rotation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#447891', '#449180', '#447891'],
  });

  const interpolateColor3 = rotation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#6bb2cd', '#6bcdb2', '#6bb2cd'],
  });

  return (
    <View style={styles.loader}>
      {[interpolateColor1, interpolateColor2, interpolateColor3].map(
        (color, index) => (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              styles[`dot${index + 1}`],
              {
                borderColor: color,
                transform: [
                  {rotateX: '24deg'},
                  {rotateY: '20deg'},
                  {rotateZ: interpolateRotation},
                  {translateZ: interpolateTranslateZ},
                ],
              },
            ]}
          />
        ),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderRadius: 100,
  },
  dot1: {
    width: 120,
    height: 120,
    borderWidth: 40,
  },
  dot2: {
    width: 140,
    height: 140,
    borderWidth: 30,
  },
  dot3: {
    width: 160,
    height: 160,
    borderWidth: 20,
  },
});

export default DotLoader;
