import React from "react";
import { TextInput, View } from "react-native";
import { globalColors, globalFormStyles } from "../../../theme/Theme";
import { PrimaryButton } from "../PrimaryButton";

type ProfileForm = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  onCreatePlaylist: () => Promise<void>;
};

export const FormCreatePlaylist = ({
  title,
  setTitle,
  mode,
  setMode,
  onCreatePlaylist,
}: ProfileForm) => {
  return (
    <View style={globalFormStyles.containerForm}>
      <View style={globalFormStyles.form}>
        <View>
          <TextInput
            style={globalFormStyles.inputLogin}
            placeholderTextColor="#838282"
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={globalFormStyles.inputLogin}
            placeholder="Mode"
            value={mode}
            placeholderTextColor="#838282"
            onChangeText={setMode}
          />
        </View>
        <PrimaryButton
          label="Create Playlist"
          bgColor={globalColors.primary}
          borderRadius={5}
          colorText={globalColors.light}
          btnFontSize={20}
          onPress={onCreatePlaylist}
        />
      </View>
    </View>
  );
};
