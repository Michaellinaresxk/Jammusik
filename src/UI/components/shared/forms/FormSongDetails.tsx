import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalColors} from '../../../theme/Theme';
import BottomSheets from '../BottomSheets';

type SongDetails = {
  songKey: string;
  setSongKey: React.Dispatch<React.SetStateAction<string>>;
  chordList: string[];
  setChordList: React.Dispatch<React.SetStateAction<string[]>>;
  notes: string;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
  lyricLink: string;
  setLyricLink: React.Dispatch<React.SetStateAction<string>>;
  tabLink: string;
  setTabLink: React.Dispatch<React.SetStateAction<string>>;
  onCreateSongDetails: () => Promise<void>;
};

export const FormSongDetails = ({
  songKey,
  setSongKey,
  chordList = [], // Ensure that there is always a default array
  setChordList,
  notes,
  setNotes,
  lyricLink,
  setLyricLink,
  tabLink,
  setTabLink,
  onCreateSongDetails,
}: SongDetails) => {
  const [chordInput, setChordInput] = useState('');

  const commonChords = [
    'A',
    'Am',
    'B',
    'Bm',
    'C',
    'Cm',
    'D',
    'Dm',
    'E',
    'Em',
    'F',
    'Fm',
    'G',
    'Gm',
    'A7',
    'D7',
    'G7',
  ];

  const handleAddChord = (chord: string) => {
    const trimmedChord = chord.trim();
    if (trimmedChord === '') {
      return;
    }

    // Validate that there are no more than 12 chords.
    if (chordList.length >= 12) {
      Alert.alert('Maximum Chords', 'You can only add up to 12 chords');
      return;
    }

    // Validate that the chord is not duplicated
    if (chordList.includes(trimmedChord)) {
      Alert.alert('Duplicate Chord', 'This chord is already in the list');
      return;
    }

    setChordList(prevChords => {
      const newChords = [...(prevChords || []), trimmedChord];
      return newChords;
    });
    setChordInput('');
  };

  const handleRemoveChord = (chordToRemove: string) => {
    setChordList(prevChords =>
      (prevChords || []).filter(chord => chord !== chordToRemove),
    );
  };

  const handleSubmitEditing = () => {
    if (chordInput.trim()) {
      handleAddChord(chordInput);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <BottomSheets onSelectKey={setSongKey} value={songKey} />

        {/* Chord Input Section */}
        <View style={styles.inputSection}>
          <TextInput
            style={styles.input}
            placeholder="Add chord (e.g., Am, G, F)"
            placeholderTextColor="#999"
            value={chordInput}
            onChangeText={setChordInput}
            autoCorrect={false}
            onSubmitEditing={handleSubmitEditing}
            autoCapitalize="characters"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddChord(chordInput)}>
            <Icon name="add" size={20} color={globalColors.light} />
          </TouchableOpacity>
        </View>

        {/* Common Chords */}
        <View style={styles.commonChordsSection}>
          <View style={styles.sectionHeader}>
            <Icon name="musical-notes" size={18} color={globalColors.primary} />
            <Text style={styles.sectionTitle}>Common Chords</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.commonChordsScroll}>
            <View style={styles.commonChordsContainer}>
              {commonChords.map(chord => (
                <TouchableOpacity
                  key={chord}
                  style={styles.commonChordButton}
                  onPress={() => handleAddChord(chord)}>
                  <Text style={styles.commonChordText}>{chord}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Selected Chords */}
        {chordList && chordList.length > 0 && (
          <View style={styles.selectedChordsSection}>
            <Text style={styles.sectionTitle}>Selected Chords:</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.selectedChordsScroll}>
              <View style={styles.selectedChordsContainer}>
                {chordList.map((chord, index) => (
                  <View key={index} style={styles.selectedChord}>
                    <Text style={styles.selectedChordText}>{chord}</Text>
                    <TouchableOpacity
                      onPress={() => handleRemoveChord(chord)}
                      style={styles.removeChordButton}>
                      <Icon
                        name="close-circle"
                        size={16}
                        color={globalColors.primaryDark}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        {/* Other inputs */}
        <TextInput
          style={styles.notesInput}
          multiline
          placeholder="Notes"
          placeholderTextColor="#999"
          value={notes}
          onChangeText={setNotes}
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Lyric link"
          placeholderTextColor="#999"
          value={lyricLink}
          onChangeText={setLyricLink}
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Tab link"
          placeholderTextColor="#999"
          value={tabLink}
          onChangeText={setTabLink}
          autoCorrect={false}
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={onCreateSongDetails}>
          <Text style={styles.saveButtonText}>Save song details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  inputSection: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: globalColors.primaryAlt,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: globalColors.primaryDark,
    height: 45,
  },
  addButton: {
    backgroundColor: globalColors.primary,
    width: 45,
    height: 45,
    borderRadius: 8,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commonChordsSection: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: globalColors.primaryDark,
    marginLeft: 8,
  },
  commonChordsScroll: {
    maxHeight: 40,
  },
  commonChordsContainer: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  commonChordButton: {
    backgroundColor: globalColors.primaryAlt,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
  },
  commonChordText: {
    color: globalColors.primary,
    fontSize: 13,
    fontWeight: '500',
  },
  selectedChordsSection: {
    marginBottom: 16,
  },
  selectedChordsScroll: {
    maxHeight: 40,
  },
  selectedChordsContainer: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  selectedChord: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: globalColors.primaryAlt,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
  },
  selectedChordText: {
    color: globalColors.primary,
    fontSize: 13,
    marginRight: 6,
  },
  removeChordButton: {
    padding: 2,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: globalColors.primaryAlt,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    height: 100,
    textAlignVertical: 'top',
    color: globalColors.primaryDark,
  },
  saveButton: {
    backgroundColor: globalColors.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: globalColors.light,
    fontSize: 16,
    fontWeight: '600',
  },
});
