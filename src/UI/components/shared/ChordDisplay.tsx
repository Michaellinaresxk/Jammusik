// components/ChordDisplay.jsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {globalColors} from '../../theme/Theme';

export const ChordDisplay = ({chordData}) => {
  if (!chordData) return null;

  console.log('Rendering ChordDisplay with data:', chordData);

  return (
    <View style={styles.container}>
      {/* Key y Difficulty */}
      <View style={styles.header}>
        <Text style={styles.keyText}>Key: {chordData.key}</Text>
        <Text style={styles.difficultyText}>
          Difficulty: {chordData.difficulty || chordData.complexity}
        </Text>
      </View>

      {/* Verse Chords */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Verse</Text>
        <View style={styles.chordRow}>
          {chordData.progressions.verse.map((chord, index) => (
            <Text key={`verse-${index}`} style={styles.chord}>
              {chord}
            </Text>
          ))}
        </View>
      </View>

      {/* Chorus Chords */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Chorus</Text>
        <View style={styles.chordRow}>
          {chordData.progressions.chorus.map((chord, index) => (
            <Text key={`chorus-${index}`} style={styles.chord}>
              {chord}
            </Text>
          ))}
        </View>
      </View>

      {/* Substitutions */}
      {chordData.substitutions && chordData.substitutions.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alternative Chords</Text>
          <View style={styles.chordRow}>
            {chordData.substitutions.map((chord, index) => (
              <Text key={`sub-${index}`} style={styles.chord}>
                {chord}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Strumming Patterns */}
      {chordData.recommendations?.strumming && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Strumming Patterns</Text>
          {chordData.recommendations.strumming.map((pattern, index) => (
            <Text key={`pattern-${index}`} style={styles.pattern}>
              {pattern}
            </Text>
          ))}
        </View>
      )}

      {/* Capo Information */}
      {chordData.recommendations?.capo && (
        <View style={styles.section}>
          <Text style={styles.capoText}>
            Capo Position: {chordData.recommendations.capo.position}
            {chordData.recommendations.capo.alternateKey &&
              ` (${chordData.recommendations.capo.alternateKey})`}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: globalColors.primary + '10', // Usando el color primario con opacidad
    borderRadius: 8,
  },
  keyText: {
    fontSize: 18,
    fontWeight: '600',
    color: globalColors.primary,
  },
  difficultyText: {
    fontSize: 16,
    color: globalColors.secondary,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    // color: globalColors.text,
  },
  chordRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chord: {
    fontSize: 16,
    padding: 8,
    backgroundColor: globalColors.primary + '15',
    borderRadius: 4,
    color: globalColors.primary,
  },
  pattern: {
    fontSize: 14,
    marginBottom: 4,
    padding: 8,
    // backgroundColor: globalColors.background,
    borderRadius: 4,
    // color: globalColors.text,
  },
  capoText: {
    fontSize: 14,
    color: globalColors.secondary,
    padding: 8,
    // backgroundColor: globalColors.background,
    borderRadius: 4,
  },
});
