import {useState, useCallback} from 'react';
import Toast from 'react-native-toast-message';
import {useCategoryService} from '../context/CategoryServiceContext';

export const useUpdateCategory = () => {
  const categoryService = useCategoryService();
  const [isLoading, setIsLoading] = useState(false);

  const updateCategory = useCallback(
    async (
      categoryId: string,
      title: string,
      setCategory: (categories: any[]) => void,
    ) => {
      setIsLoading(true);
      try {
        console.log('Updating playlist:', categoryId, title);

        // Call the service to update the playlist
        await categoryService.updateCategory(categoryId, title);

        console.log('Playlist update successful');

        // Update the state
        setCategory(currentCategories =>
          currentCategories.map(category =>
            category.id === categoryId ? {...category, title} : category,
          ),
        );

        // Show success toast
        Toast.show({
          type: 'success',
          text1: 'Playlist Updated Successfully',
        });
      } catch (error) {
        console.error('Failed to update playlist', error);

        // Show error toast
        Toast.show({
          type: 'error',
          text1: 'Update Failed',
          text2: 'Could not update playlist',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [categoryService],
  );

  return {updateCategory, isLoading};
};
