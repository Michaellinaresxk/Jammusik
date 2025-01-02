import React, {useState, useEffect} from 'react';
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
import {PrimaryIcon} from '../PrimaryIcon';

export const FormCreateSong = ({
  categoryId,
  categoryTitle,
  onSubmit,
  isLoading,
  isEditing = false,
  initialValues = {title: '', artist: ''},
}) => {
  const [title, setTitle] = useState(initialValues.title);
  const [artist, setArtist] = useState(initialValues.artist);
  const [errors, setErrors] = useState({
    title: '',
    artist: '',
  });
  const [selectedCategory, setSelectedCategory] = useState(categoryId);
  const [categories, setCategories] = useState([]);

  const categoryService = useCategoryService();
  const isLibraryOrHome = categoryId === 'Library' || !categoryId;

  useEffect(() => {
    const loadCategories = async () => {
      try {
        if (auth.currentUser) {
          const userId = auth.currentUser.uid;
          const fetchedCategories = await categoryService.getCategories(userId);
          const formattedCategories = (fetchedCategories || []).map(
            category => ({
              label: category.title,
              value: category.id,
            }),
          );
          setCategories(formattedCategories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        Alert.alert(
          'Error',
          'Failed to load categories. Please try again later.',
        );
      }
    };

    if (isLibraryOrHome) {
      loadCategories();
    }
  }, [categoryService, isLibraryOrHome]);

  const validateForm = () => {
    const newErrors = {
      title: '',
      artist: '',
    };
    let isValid = true;

    if (!title.trim()) {
      newErrors.title = 'The title is required';
      isValid = false;
    }

    if (!artist.trim()) {
      newErrors.artist = 'The artist is required';
      isValid = false;
    }

    if (isLibraryOrHome && !selectedCategory) {
      Alert.alert('Error', 'Please select a category');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const finalCategoryId = isLibraryOrHome ? selectedCategory : categoryId;
        await onSubmit({
          title,
          artist,
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
    }
  };

  return (
    <View style={globalFormStyles.containerForm}>
      <View style={globalFormStyles.form}>
        <TextInput
          style={[
            globalFormStyles.inputLogin,
            errors.title && styles.inputError,
          ]}
          placeholderTextColor="#838282"
          placeholder="Title"
          autoCorrect={false}
          autoCapitalize="words"
          value={title}
          onChangeText={text => {
            setTitle(text);
            setErrors(prev => ({...prev, title: ''}));
          }}
        />
        {errors.title ? (
          <Text style={styles.errorText}>{errors.title}</Text>
        ) : null}

        <TextInput
          style={[
            globalFormStyles.inputLogin,
            errors.artist && styles.inputError,
          ]}
          placeholder="Artist"
          placeholderTextColor={'gray'}
          autoCapitalize="words"
          autoCorrect={false}
          value={artist}
          onChangeText={text => {
            setArtist(text);
            setErrors(prev => ({...prev, artist: ''}));
          }}
        />
        {errors.artist ? (
          <Text style={styles.errorText}>{errors.artist}</Text>
        ) : null}

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
          disabled={isLoading || (isLibraryOrHome && !selectedCategory)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  inputError: {
    borderColor: 'red',
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

export default FormCreateSong;
