import React, { useEffect, useState } from "react";
import { TextInput, View, Text, ActivityIndicator } from "react-native";
import { globalColors, globalFormStyles } from "../../../theme/Theme";
import { PrimaryButton } from "../PrimaryButton";
import { CustomDropdown } from "../CustomDropdown";
import { useCategoryService } from "../../../../context/CategoryServiceContext";
import { auth } from "../../../../infra/api/firebaseConfig";
import { Formik } from "formik";
import { validationCreateSongForm } from "./yup/validation_create_song";

type SongForm = {
  categoryId: string;
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  artist: string;
  setArtist: React.Dispatch<React.SetStateAction<string>>;
  onCreateSong: () => Promise<void>;
  isLoading: boolean;
};

type DropdownItem = {
  label: string;
  value: string;
};

export const FormCreateSong = ({
  categoryId,
  setCategoryId,
  title,
  setTitle,
  artist,
  setArtist,
  onCreateSong,
  isLoading,
}: SongForm) => {
  const categoryService = useCategoryService();
  const [categories, setCategories] = useState<DropdownItem[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const fetchedCategories = await categoryService.getCategories(userId);
        const formattedCategories = fetchedCategories.map(category => ({
          label: category.title,
          value: category.id,
        }));
        setCategories(formattedCategories);
      }
    };

    loadCategories();
  });

  const handleCategoryChange = (selectedCategoryId: string) => {
    setCategoryId(selectedCategoryId);
  };

  return (
    <View style={globalFormStyles.containerForm}>
      <Formik
        validationSchema={validationCreateSongForm}
        initialValues={{ title: "", artist: "" }}
        onSubmit={onCreateSong}>
        {({ values, errors, handleChange, handleSubmit, touched }) => (
          <View style={globalFormStyles.form}>
            <TextInput
              style={globalFormStyles.inputLogin}
              placeholderTextColor="#838282"
              placeholder="Title"
              autoCorrect={false}
              autoCapitalize="words"
              value={values.title}
              onChangeText={handleChange("title")}
            />

            {errors.title && touched.title ? (
              <Text style={{ color: "red", marginBottom: 5 }}>
                {errors.title}
              </Text>
            ) : null}
            <TextInput
              style={globalFormStyles.inputLogin}
              placeholder="Artist"
              placeholderTextColor={"gray"}
              autoCapitalize="words"
              autoCorrect={false}
              value={values.artist}
              onChangeText={handleChange("artist")}
            />
            {errors.artist && touched.artist ? (
              <Text style={{ color: "red", marginBottom: 5 }}>
                {errors.artist}
              </Text>
            ) : null}

            {categories.length > 0 && (
              <CustomDropdown
                items={categories}
                defaultValue={categoryId || categories[0].value}
                placeholder="Choose a category"
                onChange={handleCategoryChange}
              />
            )}
            <PrimaryButton
              label={
                !isLoading ? (
                  "Create A New Song"
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
