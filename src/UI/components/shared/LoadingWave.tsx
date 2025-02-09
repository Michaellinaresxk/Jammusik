import React, {useEffect, useRef} from 'react';
import {View, Animated, StyleSheet} from 'react-native';

const LoadingWave = () => {
  const bars = [
    useRef(new Animated.Value(10)).current,
    useRef(new Animated.Value(10)).current,
    useRef(new Animated.Value(10)).current,
    useRef(new Animated.Value(10)).current,
  ];

  useEffect(() => {
    bars.forEach((bar, index) => {
      const animate = () => {
        Animated.sequence([
          Animated.timing(bar, {
            toValue: 50,
            duration: 500,
            useNativeDriver: false,
          }),
          Animated.timing(bar, {
            toValue: 10,
            duration: 500,
            useNativeDriver: false,
          }),
        ]).start(() => animate()); // Bucle infinito
      };

      setTimeout(animate, index * 100); // Retraso para crear el efecto de ola
    });
  }, []);

  return (
    <View style={styles.container}>
      {bars.map((bar, index) => (
        <Animated.View key={index} style={[styles.loadingBar, {height: bar}]} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  loadingBar: {
    width: 20,
    backgroundColor: '#3498db',
    marginHorizontal: 5,
    borderRadius: 5,
  },
});

export default LoadingWave;
