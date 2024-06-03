import React, { useCallback, useEffect, useState } from "react";
import { TextInput, View } from "react-native";
import { globalColors, globalFormStyles } from "../../../theme/Theme";
import { PrimaryButton } from "../PrimaryButton";
import { CustomDropdown } from "../CustomDropdown";
import { useCategoryService } from "../../../../context/CategoryServiceContext";
import { auth } from "../../../../infra/api/firebaseConfig";

type SongForm = {
  categoryId: string;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  artist: string;
  setArtist: React.Dispatch<React.SetStateAction<string>>;
  onCreateSong: () => Promise<void>;
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
      <View style={globalFormStyles.form}>
        <TextInput
          style={globalFormStyles.inputLogin}
          placeholderTextColor="#838282"
          placeholder="Title"
          autoCorrect={false}
          autoCapitalize="words"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={globalFormStyles.inputLogin}
          placeholder="Artist"
          autoCapitalize="words"
          autoCorrect={false}
          value={artist}
          onChangeText={text => setArtist(text)}
        />
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
          label="Create A New Song"
          bgColor={globalColors.primary}
          borderRadius={5}
          colorText={globalColors.light}
          btnFontSize={20}
          onPress={onCreateSong}
        />
      </View>
    </View>
  );
};
