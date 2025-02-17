// components/ChordGeneratorModal.jsx
import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
} from 'react-native';
import {PrimaryIcon} from '../PrimaryIcon';
import {globalColors} from '../../../theme/Theme';
import {ChordGenerator} from '../ChordGenerator';

export const ChordGeneratorModal = ({
  visible,
  onClose,
  title,
  artist,
  chordData,
  onChordsGenerated,
}) => {
  const renderChordSection = (title, chords) => (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <PrimaryIcon
          name="musical-notes-sharp"
          size={20}
          color={globalColors.primary}
        />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <View style={styles.chordRow}>
        {chords.map((chord, index) => (
          <View key={`${title}-${index}`} style={styles.chordBubble}>
            <Text style={styles.chordText}>{chord}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>AI Chord Generator</Text>
            <Pressable
              style={({pressed}) => [
                styles.closeButton,
                pressed && styles.closeButtonPressed,
              ]}
              onPress={onClose}>
              <PrimaryIcon
                name="close-circle"
                size={28}
                color={globalColors.primary}
              />
            </Pressable>
          </View>

          {/* Generate Button Section */}
          {!chordData && (
            <View style={styles.generateSection}>
              <Text style={styles.songInfo}>
                {title} - {artist}
              </Text>
              <ChordGenerator
                title={title}
                artist={artist}
                onChordsGenerated={onChordsGenerated}
              />
            </View>
          )}

          {/* Chord Display Section */}
          {chordData && (
            <ScrollView
              style={styles.scrollContent}
              showsVerticalScrollIndicator={false}>
              {/* Key and Difficulty */}
              <View style={styles.infoContainer}>
                <View style={styles.infoBubble}>
                  <PrimaryIcon
                    name="key"
                    size={20}
                    color={globalColors.primary}
                  />
                  <Text style={styles.infoText}>Key: {chordData.key}</Text>
                </View>
                <View style={styles.infoBubble}>
                  <PrimaryIcon
                    name="stats-chart"
                    size={20}
                    color={globalColors.primary}
                  />
                  <Text style={styles.infoText}>
                    Difficulty: {chordData.difficulty || 'Moderate'}
                  </Text>
                </View>
              </View>

              {/* Verse Chords */}
              {renderChordSection('Verse', chordData.progressions.verse)}

              {/* Chorus Chords */}
              {renderChordSection('Chorus', chordData.progressions.chorus)}

              {/* Substitutions */}
              {chordData.substitutions && (
                <View style={styles.sectionContainer}>
                  <View style={styles.sectionHeader}>
                    <PrimaryIcon
                      name="git-compare"
                      size={20}
                      color={globalColors.primary}
                    />
                    <Text style={styles.sectionTitle}>Alternative Chords</Text>
                  </View>
                  <View style={styles.chordRow}>
                    {chordData.substitutions.map((chord, index) => (
                      <View key={`sub-${index}`} style={styles.chordBubble}>
                        <Text style={styles.chordText}>{chord}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Strumming Patterns */}
              {chordData.recommendations?.strumming && (
                <View style={styles.sectionContainer}>
                  <View style={styles.sectionHeader}>
                    <PrimaryIcon
                      name="pulse"
                      size={20}
                      color={globalColors.primary}
                    />
                    <Text style={styles.sectionTitle}>Strumming Patterns</Text>
                  </View>
                  {chordData.recommendations.strumming.map((pattern, index) => (
                    <View key={`pattern-${index}`} style={styles.patternBubble}>
                      <Text style={styles.patternText}>{pattern}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Capo Information */}
              {chordData.recommendations?.capo && (
                <View style={[styles.sectionContainer, styles.capoSection]}>
                  <View style={styles.sectionHeader}>
                    <PrimaryIcon
                      name="options"
                      size={20}
                      color={globalColors.primary}
                    />
                    <Text style={styles.sectionTitle}>Capo Settings</Text>
                  </View>
                  <View style={styles.capoInfo}>
                    <Text style={styles.capoText}>
                      Position: {chordData.recommendations.capo.position}
                    </Text>
                    {chordData.recommendations.capo.alternateKey && (
                      <Text style={styles.capoText}>
                        Alternate Key:{' '}
                        {chordData.recommendations.capo.alternateKey}
                      </Text>
                    )}
                  </View>
                </View>
              )}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    minHeight: '80%',
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: globalColors.primaryDark,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonPressed: {
    opacity: 0.7,
  },
  generateSection: {
    alignItems: 'center',
    padding: 20,
  },
  songInfo: {
    fontSize: 18,
    color: globalColors.primary,
    marginBottom: 20,
  },
  scrollContent: {
    flex: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  infoBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
    color: globalColors.primaryDark,
  },
  sectionContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: globalColors.primaryDark,
    marginLeft: 8,
  },
  chordRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chordBubble: {
    backgroundColor: globalColors.primaryAlt,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  chordText: {
    fontSize: 16,
    color: globalColors.primary,
    fontWeight: '500',
  },
  patternBubble: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  patternText: {
    fontSize: 16,
    color: globalColors.primaryDark,
    textAlign: 'center',
  },
  capoSection: {
    marginBottom: 40,
  },
  capoInfo: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 10,
  },
  capoText: {
    fontSize: 16,
    color: globalColors.primaryDark,
    marginBottom: 5,
  },
});
