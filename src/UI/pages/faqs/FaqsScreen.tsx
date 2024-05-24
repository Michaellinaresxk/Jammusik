import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AccordionItem } from "../../components/shared/AccodionItems";
import { globalColors } from "../../theme/Theme";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamsList } from "../../routes/StackNavigator";
import { BrandLogo } from "../../components/shared/BrandLogo";

export const FaqsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

  const [askes, setAskes] = useState([
    {
      id: 0,
      ask: "What kind of additional information can I add to each song?",
      answer:
        "For each song, you can add details such as chords, key, notes, tablature links and lyrics, which is especially useful during rehearsals.",
      state: false,
    },
    {
      id: 1,
      ask: "How does the categorization of songs by musical genre work in Jammusik?",
      answer:
        "The application has a categories section where you can filter songs by musical genre. This allows you to easily find all songs of a specific genre....",
      state: false,
    },
    {
      id: 2,
      ask: "Does Jammusik play music?",
      answer:
        "No, in this version, Jammusik focuses on managing and organizing playlists and not on playing music.",
      state: false,
    },
  ]);

  return (
    <View style={styles.containerAsk}>
      <Pressable
        style={styles.goBackContent}
        onPress={() => navigation.goBack()}>
        <Icon
          name="chevron-back-sharp"
          color={globalColors.primary}
          size={25}
        />
        <Text style={styles.goBackLabel}>Back</Text>
      </Pressable>
      <Text style={styles.titleAsk}> Frequently asked questions</Text>
      <Text style={styles.description}>
        Need help with something? Here are the most asked questions
      </Text>

      <AccordionItem askes={askes} setAskes={setAskes} />
      <BrandLogo />
    </View>
  );
};

const styles = StyleSheet.create({
  containerAsk: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  goBackContent: {
    fontSize: 15,
    fontWeight: "bold",
    margin: "auto",
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  goBackLabel: {
    fontSize: 15,
    color: globalColors.terceary,
  },
  titleAsk: {
    color: globalColors.primaryDark,
    fontSize: 25,
    marginTop: 50,
    fontWeight: "900",
  },
  description: {
    fontSize: 20,
    color: globalColors.primaryDark,
    marginTop: 20,
    marginBottom: 20,
  },
});
