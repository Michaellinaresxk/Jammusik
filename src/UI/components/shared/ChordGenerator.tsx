// components/ChordGenerator.jsx
import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useChordGenerator} from '../../../hooks/useChordGenerator';
import {PrimaryButton} from './PrimaryButton';
import {globalColors} from '../../theme/Theme';

export const ChordGenerator = ({title, artist, onChordsGenerated, style}) => {
  const {generateChords, loading} = useChordGenerator();

  const handleGenerateChords = async () => {
    // Primero, verifica que tenemos los datos necesarios
    console.log('Button pressed with:', {title, artist});
    Alert.alert(
      'Debug',
      `Attempting to generate chords for: ${title} by ${artist}`,
    );

    try {
      // Verifica que la llamada al servicio funciona
      const chordData = await generateChords(title, artist);
      console.log('Response:', chordData);

      if (chordData) {
        Alert.alert(
          'Success!',
          'Chords were generated. Check console for details.',
          [
            {
              text: 'OK',
              onPress: () => onChordsGenerated(chordData),
            },
          ],
        );
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', error.message || 'Failed to generate chords');
    }
  };

  return (
    <View style={[styles.container, style]}>
      <PrimaryButton
        label={loading ? 'Generating Chords...' : 'Generate with AI'}
        onPress={() => {
          Alert.alert('Confirm', 'Generate chords?', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: handleGenerateChords,
            },
          ]);
        }}
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
