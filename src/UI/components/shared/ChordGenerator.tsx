import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useChordGenerator} from '../../../hooks/useChordGenerator';
import {PrimaryButton} from '../shared/PrimaryButton';
import {globalColors} from '../../theme/Theme';
import {MusicalLoader} from './animated/MusicalLoader';

export const ChordGenerator = ({title, artist, onChordsGenerated, style}) => {
  const {generateChords, loading} = useChordGenerator();
  const [showLoader, setShowLoader] = useState(false);

  const handleGenerateChords = async () => {
    try {
      setShowLoader(true);
      const chordData = await generateChords(title, artist);
      if (chordData) {
        onChordsGenerated(chordData);
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Unable to generate chords. Please try again later.',
      );
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <PrimaryButton
        label={loading ? 'Generating...' : 'Generate with AI'}
        onPress={handleGenerateChords}
        disabled={showLoader}
        btnFontSize={18}
        colorText={globalColors.light}
        bgColor={globalColors.primary}
        borderRadius={5}
      />

      <MusicalLoader visible={showLoader} />
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
