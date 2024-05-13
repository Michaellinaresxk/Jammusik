import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export const SliderQuotes = () => {
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
    marginBottom: 5,
  },
});
