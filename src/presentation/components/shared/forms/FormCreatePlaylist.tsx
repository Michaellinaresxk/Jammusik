import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { globalColors } from "../../../theme/Theme";
import { PrimaryButton } from "../PrimaryButton";

type ProfileForm = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  location: string;
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
    <View style={style.containerForm}>
      <View style={style.form}>
        <View>
          <TextInput
            style={style.inputLogin}
            placeholderTextColor="#838282"
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={style.inputLogin}
            placeholder="Mode"
            value={mode}
            placeholderTextColor="#838282"
            onChangeText={setMode}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <PrimaryButton
            label="Create A New Playlist"
            bgColor={globalColors.primaryAlt}
            borderRadius={5}
            colorText={globalColors.primary}
            btnFontSize={20}
            onPress={onCreatePlaylist}
          />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  containerForm: {
    height: "auto",
    color: "white",
  },
  labelTitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    color: globalColors.secondary,
  },

  form: {
    width: "90%",
    padding: 10,
    alignSelf: "center",
    marginTop: 20,
  },

  labelText: {
    fontSize: 24,
  },

  inputLogin: {
    borderWidth: 0.2,
    borderBottomColor: globalColors.terceary,
    color: globalColors.terceary,
    fontSize: 20,
    marginBottom: 30,
    padding: 10,
  },
});
