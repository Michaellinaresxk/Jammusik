import React from "react";
import { TextInput, View } from "react-native";
import { globalColors, globalFormStyles } from "../../../theme/Theme";
import { PrimaryButton } from "../PrimaryButton";

type CategoryForm = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  onCreateCategory: () => Promise<void>;
};

export const FormCreateCategory = ({
  title,
  setTitle,
  onCreateCategory,
}: CategoryForm) => {
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
          label="Create Category"
          bgColor={globalColors.primary}
          borderRadius={5}
          colorText={globalColors.light}
          btnFontSize={20}
          onPress={onCreateCategory}
        />
      </View>
    </View>
  );
};
