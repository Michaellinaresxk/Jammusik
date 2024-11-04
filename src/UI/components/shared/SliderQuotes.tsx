import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Animated, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
import { globalColors } from "../../theme/Theme";

const { width } = Dimensions.get("window");

export const SliderQuotes = () => {
  const [quotes, setQuotes] = useState([
    "Music is the soundtrack of your life, make it awesome...",
    "Music is the art of thinking with melodies and sounds.",
    "Music can change the world, it can change minds.",
    "Music is the wine that fills the cup of silence.",
    "Music is the bridge that brings us together and connects us.",
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        delay: 3500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentIndex]);

  return (
    <View>
      <View style={styles.containerImage}>
        <Svg
          width="50"
          height="50"
          viewBox="0 0 69 53"
          fill="none"
          style={styles.brandLogo}>
          <Path
            d="M15.3333 42.4H23V10.6H15.3333V42.4ZM30.6667 53H38.3333V0H30.6667V53ZM0 31.8H7.66667V21.2H0V31.8ZM46 42.4H53.6667V10.6H46V42.4ZM61.3333 21.2V31.8H69V21.2H61.3333Z"
            fill="#56B5A6"
          />
        </Svg>
        <Animated.View style={{ ...styles.quoteContainer, opacity: fadeAnim }}>
          <Text style={styles.quoteText}>{quotes[currentIndex]}</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerImage: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  brandLogo: {
    marginBottom: 20,
  },
  quoteContainer: {
    width: width * 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  quoteText: {
    fontSize: 18,
    textAlign: "center",
    color: globalColors.terceary,
  },
});
