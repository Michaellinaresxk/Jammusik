import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";

import { globalColors } from "../../theme/Theme";

type TextLinks = {
  text: string;
  goTo: never;
  link: string;
};

const LinkFeedback = ({ text, goTo, link }: TextLinks) => {
  const navigation = useNavigation();
  return (
    <View style={styles.containerLink}>
      <Pressable onPress={() => navigation.navigate(goTo)}>
        <Text style={styles.link}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default LinkFeedback;
const styles = StyleSheet.create({
  link: {
    fontWeight: "bold",
    fontSize: 18,
    color: globalColors.primary,
  },
  containerLink: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
    gap: 5,
    justifyContent: "center",
  },
  text: {
    color: globalColors.primary,
  },
});