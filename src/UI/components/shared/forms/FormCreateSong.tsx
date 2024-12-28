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
import {PrimaryIcon} from '../PrimaryIcon';

type DropdownItem = {
  label: string;
  value: string;
};

type FormCreateSongProps = {
  categoryId: string;
  categoryTitle?: string;
  onSubmit: (values: {
    title: string;
    artist: string;
    categoryId?: string;
  }) => Promise<void>;
  isLoading: boolean;
  isEditing?: boolean;
  initialValues?: {
    title: string;
    artist: string;
    categoryId?: string;
  };
};

export const FormCreateSong = ({
  categoryId,
  categoryTitle,
  onSubmit,
  isLoading,
  isEditing = false,
  initialValues,
}: FormCreateSongProps) => {
  const categoryService = useCategoryService();
  const [categories, setCategories] = useState<DropdownItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialValues?.categoryId || categoryId,
  );

  // Modificamos esta condición para incluir cuando estamos en Home
  const isLibraryOrHome = categoryId === 'Library' || !categoryId;

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

    if (isLibraryOrHome) {
      loadCategories();
    }
  }, [categoryService, isLibraryOrHome]);

  return (
    <View style={globalFormStyles.containerForm}>
      <Formik
        validationSchema={validationCreateSongForm}
        initialValues={initialValues || {title: '', artist: ''}}
        enableReinitialize
        onSubmit={async values => {
          try {
            if (isLibraryOrHome && !selectedCategory) {
              Alert.alert('Error', 'Please select a category');
              return;
            }

            const finalCategoryId = isLibraryOrHome
              ? selectedCategory
              : categoryId;
            await onSubmit({
              ...values,
              categoryId: finalCategoryId,
            });
          } catch (error) {
            console.error('Error with song:', error);
            Alert.alert(
              'Error',
              `Failed to ${
                isEditing ? 'update' : 'create'
              } song. Please try again.`,
            );
          }
        }}>
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

            {isLibraryOrHome ? (
              categories.length > 0 && (
                <CustomDropdown
                  items={categories}
                  defaultValue={selectedCategory}
                  placeholder="Select a category"
                  onChange={value => setSelectedCategory(value)}
                />
              )
            ) : (
              <View style={styles.titleContent}>
                <PrimaryIcon
                  name="musical-notes-sharp"
                  size={22}
                  color={globalColors.primary}
                />
                <Text style={styles.categoryText}>
                  Category: {categoryTitle || 'Unknown'}
                </Text>
              </View>
            )}

            <PrimaryButton
              label={
                isLoading ? (
                  <ActivityIndicator size="large" />
                ) : isEditing ? (
                  'Update Song'
                ) : (
                  'Create A New Song'
                )
              }
              bgColor={globalColors.primary}
              borderRadius={5}
              colorText={globalColors.light}
              btnFontSize={20}
              onPress={handleSubmit}
              disabled={isLibraryOrHome && !selectedCategory}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContent: {
    textAlign: 'center',
    flexDirection: 'row',
    gap: 5,
    backgroundColor: globalColors.primaryAlt,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 14,
    marginBottom: 30,
  },
  categoryText: {
    fontSize: 18,
    color: globalColors.primary,
  },
});
