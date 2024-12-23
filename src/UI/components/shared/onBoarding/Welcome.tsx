import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {globalColors} from '../../../theme/Theme';

export const Welcome = ({visible, onStart, userName = 'There'}) => {
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;
  console.log('user name in welcome');
  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [opacityAnim, scaleAnim, visible]);

  if (!visible) return null;

  return (
    <Modal
      visible={visible} // Visible strength for testing
      transparent
      animationType="fade">
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.content,
            {
              transform: [{scale: scaleAnim}],
              opacity: opacityAnim,
            },
          ]}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>🎵</Text>
          </View>

          <Text style={styles.title}>
            Welcome {userName} to your music app!
          </Text>

          <Text style={styles.description}>
            Let us help you organize your music in 3 simple steps:
          </Text>

          <View style={styles.steps}>
            <StepItem
              number="1"
              title="Create categories"
              description="Organize your music by genre or mood."
            />
            <StepItem
              number="2"
              title="Add songs"
              description="Add your favorite songs to each category."
            />
            <StepItem
              number="3"
              title="Create playlists"
              description="Combines songs from different categories."
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={onStart}>
            <Text style={styles.buttonText}>¡Empezar!</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const StepItem = ({number, title, description}) => (
  <View style={styles.stepItem}>
    <View style={styles.stepNumber}>
      <Text style={styles.stepNumberText}>{number}</Text>
    </View>
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>{title}</Text>
      <Text style={styles.stepDescription}>{description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  userName: {
    color: globalColors.primaryDark,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: globalColors.light,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: globalColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  iconText: {
    fontSize: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: globalColors.primary,
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: globalColors.terceary,
    textAlign: 'center',
    marginBottom: 24,
  },
  steps: {
    marginBottom: 24,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: globalColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: globalColors.light,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: globalColors.primary,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: globalColors.terceary,
  },
  button: {
    backgroundColor: globalColors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: globalColors.light,
    fontSize: 18,
    fontWeight: 'bold',
  },
  tooltipOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  tooltipContainer: {
    position: 'absolute',
    width: '80%',
    maxWidth: 300,
    backgroundColor: globalColors.light,
    borderRadius: 12,
    padding: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tooltipContent: {
    alignItems: 'flex-start',
  },
  tooltipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: globalColors.primary,
    marginBottom: 8,
  },
  tooltipDescription: {
    fontSize: 14,
    color: globalColors.terceary,
    marginBottom: 16,
  },
  tooltipButton: {
    alignSelf: 'flex-end',
    backgroundColor: globalColors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  tooltipButtonText: {
    color: globalColors.light,
    fontWeight: 'bold',
  },
});
