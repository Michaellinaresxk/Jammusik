import {
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Modal,
  Pressable,
  RefreshControl,
} from 'react-native';
import {globalColors, globalStyles} from '../../theme/Theme';
import {images} from '../../../assets/img/Images';
import {CategoryCard} from '../../components/shared/cards/CategoryCard';
import {type NavigationProp, useNavigation} from '@react-navigation/native';
import {type RootStackParamsList} from '../../routes/StackNavigator';
import {useCategoryService} from '../../../context/CategoryServiceContext';
import {useCallback, useEffect, useState} from 'react';
import {CategoryView} from '../../../views/CategoryView';
import {PrimaryButton} from '../../components/shared/PrimaryButton';
import {FormCreateCategory} from '../../components/shared/forms/FormCreateCategory';
import {getAuth} from 'firebase/auth';
import {Separator} from '../../components/shared/Separator';
import Icon from 'react-native-vector-icons/Ionicons';
import {usePullRefresh} from '../../../hooks/usePullRefresing';
import Toast from 'react-native-toast-message';
import React from 'react';
import {useUpdateCategory} from '../../../hooks/useUpdateCategory';

export const CategoriesScreen = () => {
  const backgroundImage = {uri: images.image3};
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  const auth = getAuth();
  const categoryService = useCategoryService();
  const [categories, setCategories] = useState<CategoryView[]>([]);
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {updateCategory, isLoading: isUpdating} = useUpdateCategory();
  const [editingCategory, setEditingCategory] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const loadCategories = useCallback(async () => {
    const user = auth.currentUser;
    const userId = user?.uid as string;
    try {
      const fetchedCategories = await categoryService.getCategories(userId);
      console.log('Fetched categories:', fetchedCategories);
      setCategories(fetchedCategories);
    } catch (error) {
      console.error('Failed to fetch playlists:', error);
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

  const closeModal = () => {
    setIsVisible(!isVisible);
  };

  const handleCreateCategory = async (values: { title: string; }) => {
    console.log('Creating category with values:', values);
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      setIsLoading(true);
      // Use values.title instead of title state
      await categoryService.createCategory(userId, values.title);
      setTitle('');
      setTriggerUpdate(true);
      setIsLoading(false);
      closeModal();
    }
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Category Deleted successfully. 👋',
    });
  };
  const showToastAll = () => {
    Toast.show({
      type: 'danger',
      text1: 'You cannot remove this category',
      topOffset: 90,
    });
  };
  const editCategoryAll = () => {
    Toast.show({
      type: 'danger',
      text1: 'You cannot edit this category',
      topOffset: 90,
    });
  };

  const handleUpdateCategory = async (values: {title: string}) => {
    if (editingCategory) {
      await updateCategory(editingCategory.id, values.title, setCategories);
      setEditingCategory(null);
      setTitle('');
      setIsVisible(false);
    }
  };

  const startEditingCategory = (category: {id: string; title: string}) => {
    setEditingCategory(category);
    setTitle(category.title);
    setIsVisible(true);
  };

  const handleDeleteCategory = async (categoryId: string) => {
    const userId = auth.currentUser;
    await categoryService.deleteCategory(userId, categoryId);
    setTriggerUpdate(true);
    showToast();
  };

  const {isRefreshing, refresh, top} = usePullRefresh(loadCategories);

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover">
      <View style={globalStyles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                progressViewOffset={top}
                colors={[
                  globalColors.primary,
                  globalColors.terceary,
                  globalColors.primary,
                ]}
                onRefresh={refresh}
              />
            }>
            <View
              style={{
                flex: 1,
                paddingHorizontal: 10,
              }}>
              <Pressable
                style={styles.goBackContent}
                onPress={() => navigation.navigate('HomeScreen')}>
                <Icon
                  name="arrow-back-sharp"
                  color={globalColors.light}
                  size={30}
                />
              </Pressable>
              <View style={styles.containerHeader}>
                <View style={styles.titleContent}>
                  <Icon
                    name="musical-notes-sharp"
                    color={globalColors.primary}
                    size={30}
                  />
                  <Text style={styles.title}>Categories</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setIsVisible(true)}
                  style={styles.openModalBtn}>
                  <Text style={styles.openModalBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Separator color={globalColors.terceary} />
            <View style={{marginTop: 30, justifyContent: 'center'}}>
              <CategoryCard
                title="All"
                onDelete={() => showToastAll}
                onEdit={() => editCategoryAll}
                onPress={() =>
                  navigation.navigate('CategorySelectedScreen', {
                    id: 'All',
                    title: 'All',
                  })
                }
              />
              <FlatList
                data={categories}
                keyExtractor={item => item.id}
                numColumns={2}
                renderItem={({item}) => (
                  <CategoryCard
                    title={item.title}
                    onEdit={() =>
                      startEditingCategory({id: item.id, title: item.title})
                    }
                    onDelete={() => handleDeleteCategory(item.id)}
                    onPress={() =>
                      navigation.navigate('CategorySelectedScreen', {
                        id: item.id,
                        title: item.title,
                        categoryId: item.categoryId,
                      })
                    }
                  />
                )}
              />
              <Modal
                visible={isVisible}
                animationType="slide"
                presentationStyle="formSheet">
                <View style={styles.modalBtnContainer}>
                  <Text style={styles.modalFormHeaderTitle}>
                    {editingCategory ? 'Edit Category' : 'Add Category'}
                  </Text>
                  <PrimaryButton
                    label="Close"
                    btnFontSize={20}
                    colorText={globalColors.light}
                    onPress={() => {
                      closeModal();
                      setEditingCategory(null);
                    }}
                  />
                </View>
                <FormCreateCategory
                  title={title}
                  setTitle={setTitle}
                  onCreateCategory={
                    editingCategory ? handleUpdateCategory : handleCreateCategory
                  }
                  isLoading={isLoading}
                  isEditing={!!editingCategory}
                  categoryId={editingCategory?.id}
                />
              </Modal>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  goBackContent: {
    fontSize: 15,
    fontWeight: 'bold',
    margin: 'auto',
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  goBackLabel: {
    fontSize: 15,
    color: globalColors.terceary,
  },
  titleContent: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 30,
    marginBottom: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: globalColors.light,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    padding: 30,
  },
  modalBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: globalColors.primary,
    paddingLeft: 20,
    paddingRight: 55,
  },
  modalFormHeaderTitle: {
    fontSize: 20,
    color: globalColors.light,
  },
  openModalBtn: {
    backgroundColor: globalColors.primaryAlt,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  openModalBtnText: {
    color: globalColors.primary,
    fontSize: 25,
  },
});
