import React, {useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {globalColors} from '../../theme/Theme';

export const ChordDisplay = ({chordData}) => {
  if (!chordData) return null;

  // We memorize the sections to avoid unnecessary re-renderings.
  const renderChordSection = useMemo(
    () => (title: string, chords: string[]) =>
      (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <View style={styles.chordRow}>
            {chords.map((chord, index) => (
              <Text key={`${title}-${index}`} style={styles.chord}>
                {chord}
              </Text>
            ))}
          </View>
        </View>
      ),
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.keyText}>Key: {chordData.key}</Text>
        <Text style={styles.difficultyText}>
          Difficulty: {chordData.difficulty || chordData.complexity}
        </Text>
      </View>

      {renderChordSection('Verse', chordData.progressions.verse)}
      {renderChordSection('Chorus', chordData.progressions.chorus)}

      {chordData.substitutions?.length > 0 &&
        renderChordSection('Alternative Chords', chordData.substitutions)}

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
    backgroundColor: globalColors.primary + '10',
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
    borderRadius: 4,
  },
  capoText: {
    fontSize: 14,
    color: globalColors.secondary,
    padding: 8,
    borderRadius: 4,
  },
});
