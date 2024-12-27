import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Music, Plus, Sparkles} from 'lucide-react-native';
import {globalColors} from '../../../theme/Theme';

const {height} = Dimensions.get('window');

const OnboardingFlow = ({
  userName,
  selectedGenres,
  onGenreSelect,
  currentStep,
  setCurrentStep,
  onComplete,
}) => {
  const defaultGenres = [
    {id: 'rock', name: 'Rock', icon: '🎸'},
    {id: 'fusion', name: 'Fusion', icon: '🎷'},
    {id: 'pop', name: 'Pop', icon: '🎤'},
    {id: 'latin-music', name: 'Latin Music', icon: '🎻'},
    {id: 'reguae', name: 'Reguae', icon: '🎹'},
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}>
      <View style={styles.content}>
        {/* Welcome Step */}
        {currentStep === 0 && (
          <View style={styles.centerContent}>
            <Sparkles
              style={styles.icon}
              size={64}
              color={globalColors.primary}
            />
            <Text style={styles.title}>
              Welcome {userName} to Your Music Journey!
            </Text>
            <Text style={styles.subtitle}>
              Let's set up your music space in 2 simple steps
            </Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => setCurrentStep(1)}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Genre Selection Step */}
        {currentStep === 1 && (
          <View style={styles.stepContainer}>
            <View style={styles.centerContent}>
              <Text style={styles.title}>Choose Your Music Genres</Text>
              <Text style={styles.subtitle}>
                Select at least one to get started
              </Text>
            </View>

            <View style={styles.genreGrid}>
              {defaultGenres.map(genre => (
                <TouchableOpacity
                  key={genre.id}
                  onPress={() => onGenreSelect(genre)}
                  style={[
                    styles.genreButton,
                    selectedGenres.includes(genre) &&
                      styles.genreButtonSelected,
                  ]}>
                  <Text style={styles.genreIcon}>{genre.icon}</Text>
                  <Text
                    style={[
                      styles.genreText,
                      selectedGenres.includes(genre) &&
                        styles.genreTextSelected,
                    ]}>
                    {genre.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {selectedGenres.length > 0 && (
              <View style={styles.alert}>
                <Music size={16} color={globalColors.primary} />
                <Text style={styles.alertTitle}>Ready to create music!</Text>
                <Text style={styles.alertDescription}>
                  You've selected {selectedGenres.length} genre
                  {selectedGenres.length !== 1 ? 's' : ''}. These will be added
                  to your category selected song and your "Library".
                </Text>
              </View>
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => setCurrentStep(0)}
                style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={selectedGenres.length === 0}
                onPress={onComplete}
                style={[
                  styles.primaryButton,
                  selectedGenres.length === 0 && styles.disabledButton,
                ]}>
                <Text style={styles.buttonText}>Complete Setup</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.secondary,
  },
  scrollContent: {
    minHeight: height,
    justifyContent: 'center',
  },
  content: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },
  centerContent: {
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: globalColors.light,
  },
  subtitle: {
    fontSize: 16,
    color: globalColors.terceary,
    textAlign: 'center',
    marginBottom: 24,
  },
  stepContainer: {
    gap: 24,
  },
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  genreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: globalColors.terceary,
    width: '45%',
    gap: 8,
  },
  genreButtonSelected: {
    borderColor: globalColors.primary,
    backgroundColor: globalColors.primaryDark,
  },
  genreTextSelected: {
    color: globalColors.light,
  },
  customGenreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: globalColors.terceary,
    width: '45%',
    gap: 8,
  },
  genreIcon: {
    fontSize: 24,
  },
  genreText: {
    fontSize: 16,
    color: globalColors.terceary,
  },
  alert: {
    backgroundColor: globalColors.primaryDark,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: globalColors.primary,
    gap: 8,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: globalColors.light,
  },
  alertDescription: {
    fontSize: 14,
    color: globalColors.terceary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    marginTop: 24,
  },
  primaryButton: {
    backgroundColor: globalColors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: globalColors.light,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  secondaryButtonText: {
    color: globalColors.terceary,
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default OnboardingFlow;
