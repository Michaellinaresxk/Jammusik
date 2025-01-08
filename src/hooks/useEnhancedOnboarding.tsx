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

      console.log('Onboarding complete. Redirecting to Home...');
      setIsFirstLogin(false); // Close the modal
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  }, []);

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
