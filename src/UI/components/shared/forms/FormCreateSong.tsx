import React, {useEffect, useState} from 'react';
import {
  TextInput,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import {globalColors, globalFormStyles} from '../../../theme/Theme';
import {PrimaryButton} from '../PrimaryButton';
import {CustomDropdown} from '../CustomDropdown';
import {useCategoryService} from '../../../../context/CategoryServiceContext';
import {auth} from '../../../../infra/api/firebaseConfig';
import {Formik} from 'formik';
import {validationCreateSongForm} from './yup/validation_create_song';

type SongForm = {
  categoryId: string;
  onCreateSong: (values: {title: string; artist: string}) => Promise<void>;
  isLoading: boolean;
};

type DropdownItem = {
  label: string;
  value: string;
};

export const FormCreateSong = ({
  categoryId,
  onCreateSong,
  isLoading,
}: SongForm) => {
  const categoryService = useCategoryService();
  const [categories, setCategories] = useState<DropdownItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryId);
  const isAllCategory = categoryId === 'All';

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

    if (isAllCategory) {
      loadCategories();
    }
  }, [categoryService, isAllCategory]);

  const handleCategoryChange = (newCategoryId: string) => {
    setSelectedCategory(newCategoryId);
  };

  const handleCreateSong = async (values: {title: string; artist: string}) => {
    try {
      if (isAllCategory && !selectedCategory) {
        Alert.alert('Error', 'Please select a category');
        return;
      }
      const finalCategoryId = isAllCategory ? selectedCategory : categoryId;
      await onCreateSong({
        title: values.title,
        artist: values.artist,
        categoryId: finalCategoryId,
      });

    } catch (error) {
      console.error('Error creating song:', error);
      Alert.alert('Error', 'Failed to create song. Please try again.');
    }
  };
  const getCurrentCategoryName = () => {
    const category = categories.find(cat => cat.value === categoryId);
    return category ? category.label : '';
  };

  return (
    <View style={globalFormStyles.containerForm}>
      <Formik
        validationSchema={validationCreateSongForm}
        initialValues={{title: '', artist: ''}}
        onSubmit={handleCreateSong}>
        {({values, errors, handleChange, handleSubmit, touched}) => (
          <View style={globalFormStyles.form}>
            <TextInput
              style={globalFormStyles.inputLogin}
              placeholderTextColor="#838282"
              placeholder="Title"
              autoCorrect={false}
              autoCapitalize="words"
              value={values.title}
              onChangeText={handleChange('title')}
            />
            {errors.title && touched.title && (
              <Text style={{color: 'red', marginBottom: 5}}>
                {errors.title}
              </Text>
            )}
            <TextInput
              style={globalFormStyles.inputLogin}
              placeholder="Artist"
              placeholderTextColor={'gray'}
              autoCapitalize="words"
              autoCorrect={false}
              value={values.artist}
              onChangeText={handleChange('artist')}
            />
            {errors.artist && touched.artist && (
              <Text style={{color: 'red', marginBottom: 5}}>
                {errors.artist}
              </Text>
            )}

            {/* Only show dropdown in "All" category view */}
            {isAllCategory ? (
              categories.length > 0 && (
                <CustomDropdown
                  items={categories}
                  defaultValue={selectedCategory}
                  placeholder="Choose a category"
                  onChange={handleCategoryChange}
                />
              )
            ) : (
              <Text style={styles.categoryText}>
                Category: {getCurrentCategoryName()}
              </Text>
            )}

            <PrimaryButton
              label={
                isLoading ? (
                  <ActivityIndicator size="large" />
                ) : (
                  'Create A New Song'
                )
              }
              bgColor={globalColors.primary}
              borderRadius={5}
              colorText={globalColors.light}
              btnFontSize={20}
              onPress={handleSubmit}
              disabled={isAllCategory && !selectedCategory} // Disable if in All view and no category selected
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: globalColors.terceary,
    marginBottom: 30,
    textAlign: 'center',
  }
});