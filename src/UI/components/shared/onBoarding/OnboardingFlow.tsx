import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import {Sparkles, Music} from 'lucide-react-native';
import {globalColors} from '../../../theme/Theme';

const {height, width} = Dimensions.get('window');

const OnboardingFlow = ({userName, onComplete}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <View style={styles.container}>
      {/* Background Shapes */}
      <View style={styles.backgroundShapes}>
        <View style={styles.circleTop} />
        <View style={styles.circleBottom} />
      </View>

      <Animated.View
        style={[
          styles.content,
          {opacity: fadeAnim, transform: [{translateY: slideAnim}]},
        ]}>
        {/* Icon */}
        <Sparkles style={styles.icon} size={64} color={globalColors.primary} />

        {/* Title and Subtitle */}
        <Text style={styles.title}>Welcome, {userName}!</Text>
        <Text style={styles.subtitle}>
          Let’s start your musical journey today.
        </Text>

        {/* Decorative Music Notes */}
        <View style={styles.musicNotes}>
          <Music size={24} color={globalColors.primary} style={styles.note} />
          <Music size={32} color={globalColors.terceary} style={styles.note} />
          <Music
            size={28}
            color={globalColors.primaryDark}
            style={styles.note}
          />
        </View>

        {/* Get Started Button */}
        <TouchableOpacity style={styles.primaryButton} onPress={onComplete}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundShapes: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  circleTop: {
    position: 'absolute',
    top: -100,
    left: -100,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: globalColors.primaryDark,
    opacity: 0.2,
  },
  circleBottom: {
    position: 'absolute',
    bottom: -150,
    right: -150,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: globalColors.primary,
    opacity: 0.1,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  // iconWrapper: {
  //   backgroundColor: globalColors.primary,
  //   padding: 16,
  //   borderRadius: 50,
  //   marginBottom: 16,
  //   shadowColor: '#000',
  //   shadowOffset: {width: 0, height: 4},
  //   shadowOpacity: 0.3,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
  icon: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: globalColors.light,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: globalColors.terceary,
    textAlign: 'center',
    marginBottom: 32,
  },
  musicNotes: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  note: {
    marginHorizontal: 8,
  },
  primaryButton: {
    backgroundColor: globalColors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    shadowColor: globalColors.primaryDark,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: globalColors.light,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default OnboardingFlow;
