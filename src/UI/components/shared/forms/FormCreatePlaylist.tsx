import React from "react";
import { TextInput, View } from "react-native";
import { globalColors, globalFormStyles } from "../../../theme/Theme";
import { PrimaryButton } from "../PrimaryButton";

type ProfileForm = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  onCreatePlaylist: () => Promise<void>;
};

export const FormCreatePlaylist = ({
  title,
  setTitle,
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
