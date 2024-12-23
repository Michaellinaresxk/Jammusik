import {useState, useCallback, useEffect} from 'react';
import {auth} from '../infra/api/firebaseConfig';
import {useUserService} from '../context/UserServiceContext';

export const useOnboarding = () => {
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const userService = useUserService();

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const user = auth.currentUser;
        // Verificamos el estado del usuario
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
            userName: user?.displayName,
          });
          setIsFirstLogin(isNew);
        }
      } catch (error) {
        console.error('Error verifying user status:', error);
      }
    };

    checkUserStatus();
  }, [userService]);

  const steps = [
    {
      id: 'categories',
      title: 'Create your first category!',
      description:
        'click on "Library" or go to the menu and click on categories, from there you can start creating songs.',
      position: {top: 420, left: 40},
    },
  ];

  const startOnboarding = useCallback(() => {
    console.log('Starting onboarding...');
    setIsFirstLogin(false);
    setTimeout(() => {
      setShowTooltip(true);
      setCurrentStep(0);
    }, 500);
  }, []);

  const nextStep = useCallback(() => {
    setShowTooltip(false);
    setCurrentStep(0);
  }, []);

  return {
    isFirstLogin,
    showTooltip,
    currentStep,
    steps,
    startOnboarding,
    nextStep,
    setShowTooltip,
    userName: auth.currentUser?.displayName || 'there',
  };
};
