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
        if (user) {
          // We try to get the current user using your service
          const userData = await userService.getCurrentUser(user.uid);
          if (userData) {
            // We compare creation time with last login
            const creationTime = new Date(user.metadata.creationTime);
            const lastSignInTime = new Date(user.metadata.lastSignInTime);
            const timeDifference = Math.abs(
              lastSignInTime.getTime() - creationTime.getTime(),
            );

            const isNew = timeDifference < 60000; // new user if the difference is less than 1 minute
            console.log('User status:', {
              isNew,
              creationTime,
              lastSignInTime,
            });
            setIsFirstLogin(isNew);
          }
        } else {
          setIsFirstLogin(false);
        }
      } catch (error) {
        console.error('Error verifying user status:', error);
        setIsFirstLogin(false);
      }
    };

    checkUserStatus();
  }, [userService]);

  const steps = [
    {
      id: 'categories',
      title: 'Create your first category!',
      description:
        'click on “Library” or go to the menu and click on categories, from there you can start creating songs.',
      position: {top: 280, left: 20},
    },
    {
      id: 'songs',
      title: 'Add your songs',
      description: 'Within each category you can add the songs of your choice.',
      position: {top: 380, left: 20},
    },
    {
      id: 'playlists',
      title: 'Create your first playlist',
      description:
        'Create playlists and combine songs from different categories, go to the playlist view in the menu and let the magic begin.',
      position: {top: 480, left: 20},
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
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowTooltip(false);
      setCurrentStep(0);
    }
  }, [currentStep, steps.length]);

  return {
    isFirstLogin,
    showTooltip,
    currentStep,
    steps,
    startOnboarding,
    nextStep,
    setShowTooltip,
  };
};
