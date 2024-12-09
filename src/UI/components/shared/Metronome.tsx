import React, {useState, useEffect, useCallback, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
import {globalColors} from '../../theme/Theme';

interface MetronomeProps {
  minBPM?: number;
  maxBPM?: number;
  defaultBPM?: number;
}

export const Metronome: React.FC<MetronomeProps> = ({
  minBPM = 40,
  maxBPM = 208,
  defaultBPM = 120,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(defaultBPM);
  const [currentBeat, setCurrentBeat] = useState(1);
  const [timeSignature, setTimeSignature] = useState(4); // 4/4 o 3/4

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const clickSoundRef = useRef<Sound | null>(null);
  const accentSoundRef = useRef<Sound | null>(null);

  const stopMetronome = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentBeat(1);
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    Sound.setCategory('Playback', true);

    clickSoundRef.current = new Sound('click.wav', Sound.MAIN_BUNDLE, error => {
      if (error) console.log('Error loading click sound');
    });

    accentSoundRef.current = new Sound(
      'accent.wav',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) console.log('Error loading accent sound');
      },
    );

    return () => {
      clickSoundRef.current?.release();
      accentSoundRef.current?.release();
      stopMetronome();
    };
  }, [stopMetronome]);

  const playBeat = useCallback(() => {
    // Usar acento solo en el primer tiempo
    const isAccent = currentBeat === 1;
    const soundToPlay = isAccent
      ? accentSoundRef.current
      : clickSoundRef.current;

    if (soundToPlay) {
      soundToPlay.stop();
      soundToPlay.play(success => {
        if (!success) {
          console.log('Error playing sound');
        }
      });
    }

    // Actualizar al siguiente tiempo
    setCurrentBeat(prev => {
      if (prev >= timeSignature) {
        return 1; // Volver al primer tiempo
      }
      return prev + 1;
    });
  }, [currentBeat, timeSignature]);

  const startMetronome = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setCurrentBeat(1); // Empezar siempre desde el primer tiempo (acento)
    const interval = (60 / bpm) * 1000;
    playBeat(); // Reproducir el primer beat inmediatamente
    intervalRef.current = setInterval(playBeat, interval);
    setIsPlaying(true);
  }, [bpm, playBeat]);

  const toggleTimeSignature = useCallback(() => {
    setTimeSignature(prev => (prev === 4 ? 3 : 4));
    setCurrentBeat(1);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      stopMetronome();
      startMetronome();
    }
  }, [bpm, isPlaying, startMetronome, stopMetronome]);

  return (
    <View style={styles.container}>
      <Text style={styles.bpmText}>{Math.round(bpm)} BPM</Text>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.button, isPlaying && styles.buttonActive]}
          onPress={() => (isPlaying ? stopMetronome() : startMetronome())}>
          <Text style={styles.buttonText}>{isPlaying ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={toggleTimeSignature}>
          <Text style={styles.buttonText}>{timeSignature}/4</Text>
        </TouchableOpacity>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={minBPM}
        maximumValue={maxBPM}
        value={bpm}
        onValueChange={setBpm}
        minimumTrackTintColor="#007AFF"
        maximumTrackTintColor="#000000"
      />

      <View style={styles.beatsContainer}>
        {Array.from({length: timeSignature}).map((_, index) => (
          <View
            key={index}
            style={[
              styles.beatIndicator,
              currentBeat === index + 1 && styles.activeBeat,
              index === 0 && styles.accentBeat, // El primer tiempo siempre es acento
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: globalColors.primaryAlt,
    borderRadius: 16,
  },
  bpmText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: globalColors.primaryDark,
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  beatsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  beatIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E5E5EA',
    marginHorizontal: 4,
  },
  activeBeat: {
    backgroundColor: globalColors.primary,
    transform: [{scale: 1.2}],
  },
  accentBeat: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: globalColors.primary,
  },
});
