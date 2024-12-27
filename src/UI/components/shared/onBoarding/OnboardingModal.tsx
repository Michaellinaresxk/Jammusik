import React from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import OnboardingFlow from './OnboardingFlow';

export const OnboardingModal = ({
  visible,
  onComplete,
  userName,
  selectedGenres,
  handleGenreSelect,
  currentStep,
  setCurrentStep,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <OnboardingFlow
          userName={userName}
          selectedGenres={selectedGenres}
          onGenreSelect={handleGenreSelect}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          onComplete={onComplete}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
