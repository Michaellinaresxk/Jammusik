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

export const FormSongDetails = ({
  initialValues = {
    songKey: '',
    chordList: [],
    notes: '',
    lyricLink: '',
    tabLink: '',
  },
  onCreateSongDetails,
}) => {
  const [songKey, setSongKey] = useState(initialValues.songKey);
  const [chordList, setChordList] = useState(initialValues.chordList || []);
  const [notes, setNotes] = useState(initialValues.notes);
  const [lyricLink, setLyricLink] = useState(initialValues.lyricLink);
  const [tabLink, setTabLink] = useState(initialValues.tabLink);
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

  const handleAddChord = chord => {
    const trimmedChord = chord.trim();
    if (!trimmedChord) return;

    if (chordList.length >= 12) {
      Alert.alert('Maximum Chords', 'You can only add up to 12 chords');
      return;
    }

    if (chordList.includes(trimmedChord)) {
      Alert.alert('Duplicate Chord', 'This chord is already in the list');
      return;
    }

    setChordList([...chordList, trimmedChord]);
    setChordInput('');
  };

  const handleRemoveChord = chordToRemove => {
    setChordList(chordList.filter(chord => chord !== chordToRemove));
  };

  const handleSubmitEditing = () => {
    if (chordInput.trim()) {
      handleAddChord(chordInput);
    }
  };

  const handleSubmit = () => {
    onCreateSongDetails({
      songKey,
      chordList,
      notes,
      lyricLink,
      tabLink,
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <BottomSheets onSelectKey={setSongKey} value={songKey} />

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

        {chordList.length > 0 && (
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

        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
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
