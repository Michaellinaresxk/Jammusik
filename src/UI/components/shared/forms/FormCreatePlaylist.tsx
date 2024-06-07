import React from "react";
import { ActivityIndicator, Text, TextInput, View } from "react-native";
import { globalColors, globalFormStyles } from "../../../theme/Theme";
import { PrimaryButton } from "../PrimaryButton";
import { Formik } from "formik";
import { validationCreatePlaylistForm } from "./yup/validation_create_playlist";

type ProfileForm = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  onCreatePlaylist: () => Promise<void>;
  isLoading: boolean;
};

export const FormCreatePlaylist = ({
  title,
  setTitle,
  onCreatePlaylist,
  isLoading,
}: ProfileForm) => {
  return (
    <View style={globalFormStyles.containerForm}>
      <Formik
        validationSchema={validationCreatePlaylistForm}
        initialValues={{ title: "" }}
        onSubmit={onCreatePlaylist}>
        {({ values, handleChange, errors, touched, handleSubmit }) => (
          <View style={globalFormStyles.form}>
            <View>
              <TextInput
                style={globalFormStyles.inputLogin}
                placeholderTextColor="#838282"
                placeholder="Title"
                value={values.title}
                autoCorrect={false}
                onChangeText={handleChange("title")}
              />
              {errors.title && touched.title ? (
                <Text style={{ color: "red" }}>{errors.title}</Text>
              ) : null}
            </View>
            <PrimaryButton
              label={
                !isLoading ? (
                  "Create Playlist"
                ) : (
                  <ActivityIndicator size={"large"} />
                )
              }
              bgColor={globalColors.primary}
              borderRadius={5}
              colorText={globalColors.light}
              btnFontSize={20}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};
