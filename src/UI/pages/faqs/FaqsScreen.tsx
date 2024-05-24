import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AccordionItem } from "../../components/shared/AccordionItem";
import { globalColors, globalStyles } from "../../theme/Theme";
import { AccordionTesting } from "../../components/shared/AccordionTesting";
import { GoBackButton } from "../../components/shared/GoBackButton";

export const FaqsScreen = () => {
  const [askes, setAskes] = useState([{
    id: 0,
    ask: "What kind of additional information can I add to each song?",
    answer: "For each song, you can add details such as chords, key, notes, tablature links and lyrics, which is especially useful during rehearsals.",
    state: false
  },
  {
    id: 1,
    ask: "How does the categorization of songs by musical genre work in Jammusik?",
    answer: "The application has a categories section where you can filter songs by musical genre. This allows you to easily find all songs of a specific genre...."
    ,
    state: false
  },
  {
    id: 2,
    ask: "Does Jammusik play music?",
    answer: "No, in this version, Jammusik focuses on managing and organizing playlists and not on playing music."
    ,
    state: false
  }])




  return (
    <View style={styles.containerAsk}>
      <Text style={styles.titleAsk}> Frequently asked questions
      </Text>
      <Text style={styles.description}>Need help with something? Here are the most asked questions</Text>
      <AccordionItem askes={askes} setAskes={setAskes} />

    </View>
  );
};


const styles = StyleSheet.create({

  containerAsk: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  titleAsk: {
    color: globalColors.primaryDark,
    fontSize: 22,
    marginTop: 50,
    fontWeight: '900',
    width: '100%'
  },
  description: {
    fontSize: 14,
    color: globalColors.primaryDark,
    marginTop: 20


  }

})
