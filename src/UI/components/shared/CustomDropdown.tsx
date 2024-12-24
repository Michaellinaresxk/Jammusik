import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalColors} from '../../theme/Theme';
import {CategoryInput} from './cards/CategoryInput';

type DropdownItem = {
  label: string;
  value: string;
};

type Props = {
  items: DropdownItem[];
  defaultValue: string;
  placeholder: string;
  onChange: (value: string, isNewCategory?: boolean) => void;
  error?: string;
  touched?: boolean;
  onInputChange?: (value: string) => void; // Nueva prop
};

export const CustomDropdown = ({
  items = [],
  defaultValue,
  placeholder,
  onChange,
  error,
  touched,
  onInputChange,
}: Props) => {
  const [showNewInput, setShowNewInput] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Default categories
  const predefinedCategories = React.useMemo(
    () => [
      {label: 'Rock', value: 'ROCK', icon: 'musical-notes'},
      {label: 'Pop', value: 'POP', icon: 'radio'},
      {label: 'Jazz', value: 'JAZZ', icon: 'musical-note'},
      {label: 'Reggae', value: 'Reggae', icon: 'musical-notes'},
      {label: 'Fusion', value: 'Fusion', icon: 'musical-notes'},
      {label: 'Funk', value: 'ELECTRONIC', icon: 'musical-notes'},
    ],
    [],
  ); // Empty array because these categories never change

  const allCategories = React.useMemo(() => {
    const userCategories = [...items];

    const uniquePredefined = predefinedCategories.filter(predef => {
      // Agregar normalización de valor y label
      return !userCategories.some(
        userCat =>
          userCat.label.toLowerCase().trim() ===
            predef.label.toLowerCase().trim() ||
          userCat.value.toLowerCase().trim() ===
            predef.value.toLowerCase().trim(),
      );
    });

    return [...userCategories, ...uniquePredefined];
  }, [items, predefinedCategories]);

  const handleSelectCategory = (category: DropdownItem) => {
    setSelectedCategory(category.value);
    onChange(category.value);
    onInputChange?.(category.label); // Update form value
  };

  const handleCreateCategory = () => {
    if (!newCategory.trim()) return;
    onChange(newCategory, true);
    onInputChange?.(newCategory);
    setNewCategory(''); // Limpiar después de crear
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a category for your song</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}>
        <View style={styles.categoriesContainer}>
          {allCategories.map(category => (
            <TouchableOpacity
              key={category.value}
              style={[
                styles.categoryButton,
                selectedCategory === category.value && styles.selectedCategory,
              ]}
              onPress={() => handleSelectCategory(category)}>
              <Icon
                name="musical-notes"
                size={20}
                color={
                  selectedCategory === category.value
                    ? '#fff'
                    : globalColors.primary
                }
              />
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category.value &&
                    styles.selectedCategoryText,
                ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.orText}>or create your own</Text>
        <View style={styles.line} />
      </View>

      <CategoryInput
        value={newCategory}
        onChange={setNewCategory}
        onSubmit={handleCreateCategory}
      />
      {error && touched && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    color: globalColors.primary,
  },
  categoriesScroll: {
    maxHeight: 120,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingVertical: 10,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 5,
    borderWidth: 1,
    borderColor: globalColors.primary,
  },
  selectedCategory: {
    backgroundColor: globalColors.primary,
  },
  categoryText: {
    color: globalColors.primary,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  orText: {
    marginHorizontal: 10,
    color: '#666',
    fontSize: 14,
  },
  createNewContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    backgroundColor: '#fff',
    paddingLeft: 15,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    marginLeft: 5,
  },
});
