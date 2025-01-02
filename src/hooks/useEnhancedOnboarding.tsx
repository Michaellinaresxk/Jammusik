import {useState, useCallback, useEffect} from 'react';
import {auth} from '../infra/api/firebaseConfig';
import {useUserService} from '../context/UserServiceContext';
import {useCategoryService} from '../context/CategoryServiceContext';
import {ONBOARDING_STEPS} from '../constants/onboarding';
import Toast from 'react-native-toast-message';
import {Category} from '../types/songTypes';

export const useEnhancedOnboarding = () => {
  const [selectedGenres, setSelectedGenres] = useState<Category[]>([]);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [currentStep, setCurrentStep] = useState(ONBOARDING_STEPS.WELCOME);
  const userService = useUserService();
  const categoryService = useCategoryService();

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const user = auth.currentUser;
        const userData = await userService.getCurrentUser(user.uid);
        if (userData) {
          const creationTime = new Date(user.metadata.creationTime);
          const lastSignInTime = new Date(user.metadata.lastSignInTime);
          const timeDifference = Math.abs(
            lastSignInTime.getTime() - creationTime.getTime(),
          );

          const isNew = timeDifference < 60000;
          setIsFirstLogin(isNew);
        }
      } catch (error) {
        console.error('Error verifying user status:', error);
      }
    };

    checkUserStatus();
  }, [userService]);

  const handleGenreSelect = useCallback(genre => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre],
    );
  }, []);

  const completeOnboarding = useCallback(async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      console.log('Starting category creation with genres:', selectedGenres);

      // Create the categories one by one
      const createdCategories = await Promise.all(
        selectedGenres.map(async genre => {
          const newCategory = await categoryService.createCategory(
            user.uid,
            genre.name,
          );
          console.log('Created category:', newCategory);
          return {
            id: newCategory.id,
            name: genre.name,
          };
        }),
      );

      console.log('All categories created:', createdCategories);

      Toast.show({
        type: 'success',
        text1: 'Setup Complete!',
        text2:
          'You can now create songs in your categories from the Home screen',
      });

      // Inmediatamente después de crear las categorías, finalizamos el onboarding
      setIsFirstLogin(false);
      setCurrentStep(ONBOARDING_STEPS.WELCOME);
    } catch (error) {
      console.error('Error creating categories:', error);
      Toast.show({
        type: 'error',
        text1: 'Error creating categories',
      });
    }
  }, [categoryService, selectedGenres]);

  return {
    isFirstLogin,
    currentStep,
    selectedGenres,
    handleGenreSelect,
    completeOnboarding,
    setCurrentStep,
    userName: auth.currentUser?.displayName || 'there',
  };
};
