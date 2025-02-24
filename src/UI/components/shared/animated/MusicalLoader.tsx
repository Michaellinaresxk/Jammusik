import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated, Easing} from 'react-native';
import {PrimaryIcon} from '../PrimaryIcon';
import {globalColors} from '../../../theme/Theme';

interface MusicalLoaderProps {
  visible: boolean;
}

export const MusicalLoader: React.FC<MusicalLoaderProps> = ({visible}) => {
  const scaleAnim1 = useRef(new Animated.Value(1)).current;
  const scaleAnim2 = useRef(new Animated.Value(1)).current;
  const scaleAnim3 = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Fade in animation
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Continuous rotation animation
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();

      // Notes bouncing animation
      const createPulseAnimation = (anim: Animated.Value, delay: number) => {
        return Animated.sequence([
          Animated.delay(delay),
          Animated.loop(
            Animated.sequence([
              Animated.timing(anim, {
                toValue: 1.2,
                duration: 600,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
              Animated.timing(anim, {
                toValue: 1,
                duration: 600,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
            ]),
          ),
        ]);
      };

      Animated.parallel([
        createPulseAnimation(scaleAnim1, 0),
        createPulseAnimation(scaleAnim2, 200),
        createPulseAnimation(scaleAnim3, 400),
      ]).start();
    } else {
      // Fade out animation
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, {opacity: opacityAnim}]}>
        <View style={styles.notesContainer}>
          {/* Bouncing musical notes */}
          <Animated.View style={{transform: [{scale: scaleAnim1}]}}>
            <PrimaryIcon
              name="musical-note"
              size={24}
              color={globalColors.primary}
            />
          </Animated.View>
          <Animated.View style={{transform: [{scale: scaleAnim2}]}}>
            <PrimaryIcon
              name="musical-notes"
              size={30}
              color={globalColors.primary}
            />
          </Animated.View>
          <Animated.View style={{transform: [{scale: scaleAnim3}]}}>
            <PrimaryIcon
              name="musical-note"
              size={24}
              color={globalColors.primary}
            />
          </Animated.View>
        </View>

        {/* Rotating circle with notes */}
        <Animated.View
          style={[styles.circleContainer, {transform: [{rotate: spin}]}]}>
          <View style={styles.noteCircle}>
            {Array.from({length: 8}).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.circleNote,
                  {
                    transform: [
                      {rotate: `${index * 45}deg`},
                      {translateY: -30},
                    ],
                  },
                ]}>
                <PrimaryIcon
                  name="musical-note"
                  size={16}
                  color={globalColors.primaryAlt}
                />
              </View>
            ))}
          </View>
        </Animated.View>

        <Text style={styles.loadingText}>Generating Chords...</Text>
        <Text style={styles.subText}>Using AI to analyze the song</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },
  circleContainer: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  noteCircle: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  circleNote: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: 20,
    height: 20,
    marginLeft: -10,
    marginTop: -10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: globalColors.primary,
    marginTop: 20,
  },
  subText: {
    fontSize: 14,
    color: globalColors.primaryDark,
    marginTop: 8,
    opacity: 0.8,
  },
});
