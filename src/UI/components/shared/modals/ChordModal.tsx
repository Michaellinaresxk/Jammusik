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
import {PrimaryButton} from '../PrimaryButton';

interface ChordModalProps {
  visible: boolean;
  onClose: () => void;
  chordList: string[];
  songKey: string;
  title: string;
  artist: string;
}

export const ChordModal: React.FC<ChordModalProps> = ({
  visible,
  onClose,
  chordList,
  songKey,
  title,
  artist,
}) => {
  const renderChord = (chord: string, index: number) => (
    <Pressable
      key={`chord-${index}`}
      style={({pressed}) => [styles.chordCard, pressed && styles.chordPressed]}>
      <Text style={styles.chordText}>{chord}</Text>
    </Pressable>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <PrimaryIcon
              name="close-circle"
              size={28}
              color={globalColors.primaryDark}
            />
          </Pressable>
          <Text style={styles.headerTitle}>Chord Progression</Text>
        </View>

        {/* Song Info */}
        <View style={styles.songInfo}>
          <Text style={styles.songTitle}>{title}</Text>
          <Text style={styles.artistName}>{artist}</Text>
          {songKey && (
            <View style={styles.keyContainer}>
              <Text style={styles.keyLabel}>Key:</Text>
              <Text style={styles.keyValue}>{songKey}</Text>
            </View>
          )}
        </View>

        {/* Chords Grid */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.chordsContainer}>
          {chordList && chordList.length > 0 ? (
            <View style={styles.chordsGrid}>
              {chordList.map((chord, index) => renderChord(chord, index))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <PrimaryIcon
                name="musical-notes"
                size={48}
                color={globalColors.primaryAlt}
              />
              <Text style={styles.emptyStateText}>No chords available yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Add chords through the song details form
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Actions */}
        <View style={styles.actions}>
          <PrimaryButton
            label="Close"
            onPress={onClose}
            btnFontSize={16}
            colorText={globalColors.light}
            bgColor={globalColors.primary}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.light,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: globalColors.primaryAlt,
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: globalColors.primaryDark,
    marginLeft: 12,
  },
  songInfo: {
    padding: 20,
    backgroundColor: globalColors.primaryAlt,
  },
  songTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: globalColors.primaryDark,
  },
  artistName: {
    fontSize: 16,
    color: globalColors.primary,
    marginTop: 4,
  },
  keyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  keyLabel: {
    fontSize: 16,
    color: globalColors.primaryDark,
    marginRight: 8,
  },
  keyValue: {
    fontSize: 16,
    fontWeight: '600',
    color: globalColors.primary,
  },
  scrollView: {
    flex: 1,
  },
  chordsContainer: {
    padding: 20,
    flexGrow: 1,
  },
  chordsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  chordCard: {
    backgroundColor: globalColors.primaryAlt,
    borderRadius: 12,
    padding: 16,
    minWidth: 80,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  chordPressed: {
    opacity: 0.8,
    transform: [{scale: 0.98}],
  },
  chordText: {
    fontSize: 18,
    fontWeight: '600',
    color: globalColors.primary,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: globalColors.primaryDark,
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: globalColors.primary,
    marginTop: 8,
    textAlign: 'center',
  },
  actions: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: globalColors.primaryAlt,
  },
});
