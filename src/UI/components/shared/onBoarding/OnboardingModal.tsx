import React from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import OnboardingFlow from './OnboardingFlow';
import FinalSongStep from './FinalOnboardingStep';
import {ONBOARDING_STEPS} from '../../../../constants/onboarding';
import {globalColors} from '../../../theme/Theme';

export const OnboardingModal = ({
  visible,
  onComplete,
  userName,
  selectedGenres = [],
  handleGenreSelect,
  currentStep,
  setCurrentStep,
  navigation,
  songService,
  completeOnboarding,
}) => {
  console.log('OnboardingModal - Current step:', currentStep);
  console.log('OnboardingModal - Selected genres:', selectedGenres);

  const renderStep = () => {
    if (currentStep === ONBOARDING_STEPS.CREATE_SONG) {
      if (!selectedGenres || selectedGenres.length === 0) {
        console.warn('No genres available for FinalSongStep');
        return null;
      }
      return (
        <FinalSongStep
          selectedGenres={selectedGenres}
          navigation={navigation}
          songService={songService}
          onComplete={onComplete}
        />
      );
    }

    return (
      <OnboardingFlow
        userName={userName}
        selectedGenres={selectedGenres}
        onGenreSelect={handleGenreSelect}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        onComplete={completeOnboarding}
      />
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>{renderStep()}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.secondary,
  },
});
