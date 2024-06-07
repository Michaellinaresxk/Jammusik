import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Text, TextInput, View } from "react-native";
import { globalColors, globalFormStyles } from "../../../theme/Theme";
import { PrimaryButton } from "../PrimaryButton";
import { CustomDropdown } from "../CustomDropdown";
import { useCategoryService } from "../../../../context/CategoryServiceContext";
import { auth } from "../../../../infra/api/firebaseConfig";
import { Formik } from "formik";
import { validationCreateSongForm } from "./yup/validation_create_song";

type SongForm = {
  categoryId: string;
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

export const FormCreateSongWithOutPlaylist = ({
  categoryId,
  title,
  setTitle,
  artist,
  setArtist,
  onCreateSong,
  isLoading,
}: SongForm) => {
  const categoryService = useCategoryService();
  const [categories, setCategories] = useState<DropdownItem[]>([]);
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<DropdownItem | null>(
    null,
  );

  const loadCategories = useCallback(async () => {
    const user = auth.currentUser;
    const userId = user?.uid as string;
    try {
      const fetchedCategories = await categoryService.getCategories(userId);
      const dropdownCategories = fetchedCategories.map(cat => ({
        label: cat.title,
        value: cat.id,
      }));
      setCategories(dropdownCategories);
      const selectedCategory = dropdownCategories.find(
        cat => cat.value === categoryId,
      );
      setCurrentCategory(selectedCategory || null);
    } catch (error) {
      console.error("Failed to fetch playlists:", error);
    }
  }, [auth.currentUser, categoryService]);

  useEffect(() => {
    // Load categories when the component mounts
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    //  Load categories when triggerUpdate changes
    if (triggerUpdate) {
      loadCategories();
      setTriggerUpdate(false);
    }
  }, [triggerUpdate, loadCategories]);

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
              placeholderTextColor="#838282"
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

            {currentCategory && (
              <CustomDropdown
                items={[currentCategory]} // Only show the current category
                defaultValue={currentCategory.value}
                placeholder="Choose a category"
                onChange={() => {}} // No-op function since it shouldn't change
                disabled={true} // Disable the dropdown
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
