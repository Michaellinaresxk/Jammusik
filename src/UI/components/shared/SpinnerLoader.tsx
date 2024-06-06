import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';


const Loader = () => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true, // Optimize for performance
      })
    ).start();
  }, []);
  progress.interpolate
  const mask = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['#fefefe'
    ],
  });



  return (
    <View style={styles.maskContainer}>
      <View style={styles.loader}>
        <Animated.View style={[StyleSheet.absoluteFill, /* { mask } */]}>
          {/* Empty view to apply the mask */}
        </Animated.View>
      </View>
    </View>
  );
};

export default Loader;
const styles = StyleSheet.create({
  loader: {
    width: 50,
    padding: 8,
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: '#25b09b',
  },
  maskContainer: {
    flex: 1, // Fill the entire container (optional for centering)
    justifyContent: 'center', // Center the loader vertically (optional)
    alignItems: 'center', // Center the loader horizontally (optional)
  },
});