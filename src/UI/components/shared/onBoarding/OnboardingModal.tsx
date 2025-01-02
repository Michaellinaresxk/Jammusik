import React from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import OnboardingFlow from './OnboardingFlow';
import {globalColors} from '../../../theme/Theme';

export const OnboardingModal = ({
  visible,
  userName,
  selectedGenres = [],
  handleGenreSelect,
  currentStep,
  setCurrentStep,
  completeOnboarding,
}) => {
  console.log('OnboardingModal - Current step:', currentStep);
  console.log('OnboardingModal - Selected genres:', selectedGenres);

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <OnboardingFlow
          userName={userName}
          selectedGenres={selectedGenres}
          onGenreSelect={handleGenreSelect}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          onComplete={completeOnboarding}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.secondary,
  },
});
