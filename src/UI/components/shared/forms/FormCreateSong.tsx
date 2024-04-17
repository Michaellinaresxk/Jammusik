import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { globalColors } from "../../../theme/Theme";
import { PrimaryButton } from "../PrimaryButton";
import { CustomDropdown } from "../CustomDropdown";
import { useCategoryService } from "../../../../context/CategoryServiceContext";

type SongForm = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  artist: string;
  setArtist: React.Dispatch<React.SetStateAction<string>>;
  categoryId: string;
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
  onCreateSong: () => Promise<void>;
};

type DropdownItem = {
  label: string;
  value: string;
};

export const FormCreateSong = ({
  title,
  setTitle,
  artist,
  setArtist,
  categoryId,
  setCategoryId,
  onCreateSong,
}: SongForm) => {
  const categoryService = useCategoryService();
  const [categories, setCategories] = useState<DropdownItem[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await categoryService.getCategories();
      const dropdownCategories = fetchedCategories.map(cat => ({
        label: cat.title,
        value: cat.id,
      }));
      setCategories(dropdownCategories);
      if (!categoryId && dropdownCategories.length > 0) {
        setCategoryId(dropdownCategories[0].value);
      }
    };

    loadCategories();
  }, [categoryId, categoryService, setCategoryId]);

  const handleCategoryChange = (selectedCategoryId: string) => {
    setCategoryId(selectedCategoryId); // This will update categoryId state used in song creation
  };

  return (
    <View style={style.containerForm}>
      <View style={style.form}>
        <TextInput
          style={style.inputLogin}
          placeholderTextColor="#838282"
          placeholder="Title"
          autoCorrect={false}
          autoCapitalize="words"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={style.inputLogin}
          placeholder="Artist"
          autoCapitalize="words"
          autoCorrect={false}
          value={artist}
          onChangeText={text => setArtist(text)}
        />
        {categories.length > 0 && (
          <CustomDropdown
            items={categories}
            defaultValue={categoryId || categories[0].value}
            placeholder="Choose a category"
            onChange={handleCategoryChange} // Handle changes here
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

const style = StyleSheet.create({
  containerForm: {
    height: "auto",
    marginTop: 50,
  },
  form: {
    width: "90%",
    padding: 10,
    alignSelf: "center",
    marginTop: 20,
  },
  inputLogin: {
    borderWidth: 0.2,
    borderBottomColor: "#ccc",
    marginBottom: 30,
    padding: 10,
  },
});