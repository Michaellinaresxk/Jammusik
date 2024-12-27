import {useState, useCallback, useEffect} from 'react';
import {auth} from '../infra/api/firebaseConfig';
import {useUserService} from '../context/UserServiceContext';
import {useCategoryService} from '../context/CategoryServiceContext';
import Toast from 'react-native-toast-message';
interface Genre {
  id: string;
  name: string;
  icon: string;
}

export const useEnhancedOnboarding = () => {
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const userService = useUserService();
  const categoryService = useCategoryService();

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const user = auth.currentUser || '';
        const userData = await userService.getCurrentUser(user.uid);
        if (userData) {
          const creationTime = new Date(user.metadata.creationTime);
          const lastSignInTime = new Date(user.metadata.lastSignInTime);
          const timeDifference = Math.abs(
            lastSignInTime.getTime() - creationTime.getTime(),
          );
          const isNew = timeDifference < 60000;
          console.log('User status:', {
            isNew,
            creationTime,
            lastSignInTime,
            userName: auth.currentUser?.displayName,
          });
          setIsFirstLogin(isNew);
        }
      } catch (error) {
        console.error('Error verifying user status:', error);
      }
    };
    checkUserStatus();
  }, [userService]);
  const handleGenreSelect = useCallback((genre: Genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre],
    );
  }, []);

  const completeOnboarding = useCallback(async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      // Crear las categorías una por una
      const createPromises = selectedGenres.map(genre =>
        categoryService.createCategory(user.uid, genre.name),
      );

      await Promise.all(createPromises);

      setIsFirstLogin(false);
      setCurrentStep(0);

      // Opcional: Mostrar un Toast de éxito
      Toast.show({
        type: 'success',
        text1: 'Categories created successfully',
      });
    } catch (error) {
      console.error('Error completing onboarding:', error);
      // Opcional: Mostrar un Toast de error
      Toast.show({
        type: 'error',
        text1: 'Failed to create categories',
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
