import React, {useState} from 'react';
import {TextInput, View, Text, FlatList, StyleSheet} from 'react-native';
import {globalColors, globalFormStyles} from '../../../theme/Theme';
import {PrimaryButton} from '../PrimaryButton';
import Icon from 'react-native-vector-icons/Ionicons';
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
  chordList,
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

  const handleChordInput = (text: string) => {
    setChordInput(text);
  };

  const handleSubmitEditing = () => {
    if (chordInput.trim() !== '') {
      setChordList(prevChordList => [...prevChordList, chordInput.trim()]);
      setChordInput('');
    }
  };

  return (
    <View style={globalFormStyles.containerForm}>
      <View style={globalFormStyles.form}>
        {/* <TextInput
          style={globalFormStyles.inputLogin}
          placeholderTextColor="#838282"
          placeholder="Key"
          value={songKey}
          autoCorrect={false}
          onChangeText={setSongKey}
        /> */}
        <BottomSheets
          onSelectKey={setSongKey}
          value={songKey}
        />
        <TextInput
          style={globalFormStyles.inputLogin}
          placeholderTextColor="#838282"
          placeholder="Put chord and press enter"
          value={chordInput}
          onChangeText={handleChordInput}
          autoCorrect={false}
          onSubmitEditing={handleSubmitEditing}
        />
        <FlatList
          data={chordList}
          horizontal={true}
          renderItem={({item}) => (
            <Text style={styles.chord}>
              {item}{' '}
              <Icon name="stop-sharp" color={globalColors.primary} size={5} />{' '}
            </Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <TextInput
          multiline={true}
          style={{...globalFormStyles.inputLogin, height: 100}}
          placeholderTextColor="#838282"
          placeholder="Notes"
          value={notes}
          autoCorrect={false}
          onChangeText={setNotes}
        />
        <TextInput
          style={globalFormStyles.inputLogin}
          placeholderTextColor="#838282"
          placeholder="Lyric link"
          value={lyricLink}
          autoCorrect={false}
          onChangeText={setLyricLink}
        />
        <TextInput
          style={globalFormStyles.inputLogin}
          placeholderTextColor="#838282"
          placeholder="Tab link"
          value={tabLink}
          autoCorrect={false}
          onChangeText={setTabLink}
        />

        <PrimaryButton
          label="Save song details"
          bgColor={globalColors.primary}
          borderRadius={5}
          colorText={globalColors.light}
          btnFontSize={20}
          onPress={onCreateSongDetails}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chord: {
    fontSize: 18,
    color: globalColors.primaryDark,
    marginBottom: 30,
  },
});
