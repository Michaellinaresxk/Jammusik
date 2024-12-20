import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {AccordionItem} from '../../components/shared/AccodionItems';
import {globalColors} from '../../theme/Theme';
import {BrandLogo} from '../../components/shared/BrandLogo';

export const FaqsScreen = () => {
  const [askes, setAskes] = useState([
    {
      id: 0,
      ask: 'What kind of additional information can I add to each song?',
      answer:
        'For each song, you can add details such as chords, key, notes, tablature links and lyrics, which is especially useful during rehearsals.',
      state: false,
    },
    {
      id: 1,
      ask: 'How does the categorization of songs by musical genre work in Jammusik?',
      answer:
        'The application has a categories section where you can filter songs by musical genre. This allows you to easily find all songs of a specific genre....',
      state: false,
    },
    {
      id: 2,
      ask: 'Does Jammusik play music?',
      answer:
        'No, in this version, Jammusik focuses on managing and organizing playlists and not on playing music.',
      state: false,
    },
  ]);

  return (
    <ScrollView>
      <View style={styles.containerAsk}>
        <Text style={styles.titleAsk}> Frequently asked questions</Text>
        <Text style={styles.description}>
          Need help with something? Here are the most asked questions
        </Text>

        <AccordionItem askes={askes} setAskes={setAskes} />
        <View style={styles.logoContent}>
          <BrandLogo />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerAsk: {
    flex: 1,
    padding: 20,
  },
  titleAsk: {
    color: globalColors.primaryDark,
    fontSize: 25,
    marginTop: 50,
    fontWeight: '900',
  },
  description: {
    fontSize: 20,
    color: globalColors.primaryDark,
    marginTop: 20,
    marginBottom: 20,
  },
  logoContent: {
    marginBottom: 100,
  },
});
