import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useChordGenerator} from '../../../hooks/useChordGenerator';
import {PrimaryButton} from './PrimaryButton';
import {globalColors} from '../../theme/Theme';

export const ChordGenerator = ({title, artist, onChordsGenerated, style}) => {
  const {generateChords, loading} = useChordGenerator();

  const handleGenerateChords = async () => {
    try {
      const chordData = await generateChords(title, artist);

      if (chordData) {
        // Prepare the chords in the format expected by your app
        const formattedChords = [
          ...chordData.progressions.verse,
          ...chordData.progressions.chorus,
        ];

        Alert.alert(
          'Chords Generated!',
          `Key: ${chordData.key}\nDifficulty: ${chordData.difficulty}\n\nWould you like to use these chords?`,
          [a
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Use Chords',
              onPress: () =>
                onChordsGenerated({
                  chords: formattedChords,
                  key: chordData.key,
                  recommendations: chordData.recommendations,
                }),
            },
          ],
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to generate chords');
    }
  };

  return (
    <View style={[styles.container, style]}>
      <PrimaryButton
        label={loading ? 'Generating Chords...' : 'Generate with AI'}
        onPress={handleGenerateChords}
        disabled={loading}
        btnFontSize={18}
        colorText={globalColors.light}
        bgColor={globalColors.primary}
        borderRadius={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
});
