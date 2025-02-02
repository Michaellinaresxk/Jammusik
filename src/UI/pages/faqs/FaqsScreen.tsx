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
        'For each song, you can add details such as chords, key, notes, tablature links and lyrics. Our AI-powered feature can also automatically generate chord progressions to help you learn songs faster. You can access instant lyrics for any song in our database.',
      state: false,
    },
    {
      id: 1,
      ask: 'How does the categorization and filtering of songs work in Jammusik?',
      answer:
        'The application offers multiple ways to find your songs: filter by musical genre, search by song name, or filter by musical key. This comprehensive filtering system makes it easy to organize and find songs for any situation.',
      state: false,
    },
    {
      id: 2,
      ask: 'How do you keep the platform updated with current music trends?',
      answer:
        'We integrate with Spotify to provide weekly updates of the top 10 new releases. This keeps you informed about trending songs and helps you stay current with the latest music.',
      state: false,
    },
    {
      id: 3,
      ask: 'Can I collaborate with other musicians through Jammusik?',
      answer:
        'Yes! You can share your playlists with other Jammusik users, making it perfect for band rehearsals or collaborative performances. This feature allows for seamless coordination between band members.',
      state: false,
    },
    {
      id: 4,
      ask: 'Does Jammusik play music?',
      answer:
        'No, in this version, Jammusik focuses on managing and organizing playlists and not on playing music. However, we provide rich features like AI-generated chords, instant lyrics, and integration with music trends.',
      state: false,
    },
  ]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false} // Hides the scroll bar
      decelerationRate="normal" // Controls the deceleration speed
      scrollEventThrottle={16} // Improves softness
      bounces={true} // Bounce-back effect at the limits
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 150, // Unifica el padding bottom
      }}
      overScrollMode="never" // Avoid the over-scroll effect in Android.
    >
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
