import React, {useEffect, useState} from 'react';
import {
  TextInput,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Alert,
  ScrollView,
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
  categoryTitle: string;
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
  const isLibraryCategory = categoryId === 'Library';

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

    if (isLibraryCategory) {
      loadCategories();
    }
  }, [categoryService, isLibraryCategory]);

  const [usedCategories, setUsedCategories] = useState<string[]>([]);

  const handleCategoryChange = async (
    value: string,
    isNewCategory: boolean,
  ) => {
    try {
      if (isNewCategory && !usedCategories.includes(value)) {
        const newCategory = await categoryService.createCategory(
          auth.currentUser!.uid,
          value,
          value.toUpperCase(),
        );
        const newCategoryItem = {
          label: value,
          value: newCategory.id,
        };
        setCategories(prev => [...prev, newCategoryItem]);
        setSelectedCategory(newCategory.id);
        setUsedCategories(prev => [...prev, value]);
      } else {
        setSelectedCategory(value);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to create category');
    }
  };

  const getCategoryTitle = (categoryId: string) => {
    if (!isLibraryCategory) {
      return categoryTitle;
    }
    const category = categories.find(cat => cat.value === categoryId);
    return category?.label || 'Library';
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={globalFormStyles.containerForm}>
        <Formik
          validationSchema={validationCreateSongForm}
          initialValues={{
            title: initialValues?.title || '',
            artist: initialValues?.artist || '',
            categoryId: initialValues?.categoryId || categoryId || '',
            categoryTitle: initialValues?.categoryTitle || categoryTitle || '',
          }}
          onSubmit={async (values, {setFieldError}) => {
            try {
              const finalCategoryId = isLibraryCategory
                ? selectedCategory
                : categoryId;

              if (!finalCategoryId) {
                setFieldError(
                  'categoryTitle',
                  isLibraryCategory
                    ? 'The category is required'
                    : 'Category ID is missing for this song',
                );
                return;
              }

              await onSubmit({
                ...values,
                categoryId: finalCategoryId,
              });
            } catch (error) {
              console.error('Error:', error);
              Alert.alert('Error', 'Failed to create song');
            }
          }}>
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            touched,
            handleBlur,
            setFieldTouched,
            setFieldError, // Agregar aquí
          }) => (
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
              {isLibraryCategory ? (
                <CustomDropdown
                  items={categories}
                  defaultValue={selectedCategory}
                  placeholder="Select or create category"
                  onChange={(value, isNewCategory) => {
                    handleCategoryChange(value, isNewCategory);
                    handleChange('categoryTitle')(value);
                    setFieldTouched('categoryTitle', true);
                  }}
                  error={
                    errors.categoryTitle && !selectedCategory
                      ? 'The category is required'
                      : undefined
                  }
                  touched={touched.categoryTitle}
                />
              ) : (
                <View style={styles.titleContent}>
                  <PrimaryIcon
                    name="musical-notes-sharp"
                    size={22}
                    color={globalColors.primary}
                  />
                  <Text style={styles.categoryText}>
                    Category: {getCategoryTitle(categoryId)}
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
                disabled={isLibraryCategory && !selectedCategory}
              />
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 20,
  },
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
