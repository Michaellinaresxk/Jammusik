import React from "react";
import { TextInput, View } from "react-native";
import { globalColors, globalFormStyles } from "../../../theme/Theme";
import { PrimaryButton } from "../PrimaryButton";

type SongDetails = {
  key: string;
  setKey: React.Dispatch<React.SetStateAction<string>>;
  chordList: string[];
  setChordList: React.Dispatch<React.SetStateAction<string>>;
  notes: string;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
  lyricLink: string;
  setLyricLink: React.Dispatch<React.SetStateAction<string>>;
  tabLink: string;
  setTabLink: React.Dispatch<React.SetStateAction<string>>;
  onCreateSongDetails: () => Promise<void>;
};

export const FormSongDetails = ({
  key,
  setKey,
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
  return (
    <View style={globalFormStyles.containerForm}>
      <View style={globalFormStyles.form}>
        <View>
          <TextInput
            style={globalFormStyles.inputLogin}
            placeholderTextColor="#838282"
            placeholder="Key"
            value={key}
            onChangeText={setKey}
          />
          <TextInput
            style={globalFormStyles.inputLogin}
            placeholderTextColor="#838282"
            placeholder="Chord List"
            value={chordList}
            onChangeText={setChordList}
          />

          <TextInput
            multiline={true}
            style={{ ...globalFormStyles.inputLogin, height: 100 }}
            placeholderTextColor="#838282"
            placeholder="Notes"
            value={notes}
            onChangeText={setNotes}
          />
          <TextInput
            style={globalFormStyles.inputLogin}
            placeholderTextColor="#838282"
            placeholder="Lyric link"
            value={lyricLink}
            onChangeText={setLyricLink}
          />
          <TextInput
            style={globalFormStyles.inputLogin}
            placeholderTextColor="#838282"
            placeholder="Tab link"
            value={tabLink}
            onChangeText={setTabLink}
          />
        </View>
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
