import React, {useState, useEffect, useCallback, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';

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
  const [beat, setBeat] = useState(1);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);

  const timerRef = useRef<any>(null);
  const clickSoundRef = useRef<Sound | null>(null);
  const accentSoundRef = useRef<Sound | null>(null);
  const lastTickTime = useRef<number>(0);
  const nextTickTime = useRef<number>(0);

  // Inicializar sonidos una sola vez
  useEffect(() => {
    Sound.setCategory('Playback');

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
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, []);

  const scheduleNextTick = useCallback(() => {
    const now = performance.now();
    const interval = (60 / bpm) * 1000;

    if (now >= nextTickTime.current) {
      // Reproducir el sonido
      const soundToPlay =
        beat === 1 ? accentSoundRef.current : clickSoundRef.current;
      soundToPlay?.play(success => {
        if (!success) console.log('Error playing sound');
      });

      // Actualizar el beat
      setBeat(prev => (prev >= beatsPerMeasure ? 1 : prev + 1));

      // Calcular el próximo tick
      lastTickTime.current = now;
      nextTickTime.current = now + interval;
    }

    if (isPlaying) {
      timerRef.current = requestAnimationFrame(scheduleNextTick);
    }
  }, [bpm, beat, beatsPerMeasure, isPlaying]);

  // Control del metrónomo
  const startMetronome = useCallback(() => {
    if (!isPlaying) {
      setIsPlaying(true);
      lastTickTime.current = performance.now();
      nextTickTime.current = lastTickTime.current;
      scheduleNextTick();
    }
  }, [isPlaying, scheduleNextTick]);

  const stopMetronome = useCallback(() => {
    setIsPlaying(false);
    setBeat(1);
    if (timerRef.current) {
      cancelAnimationFrame(timerRef.current);
    }
  }, []);

  // Efecto para manejar cambios en BPM
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
          onPress={isPlaying ? stopMetronome : startMetronome}>
          <Text style={styles.buttonText}>{isPlaying ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setBeatsPerMeasure(prev => (prev === 4 ? 3 : 4));
            setBeat(1);
          }}>
          <Text style={styles.buttonText}>{beatsPerMeasure}/4</Text>
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
        {Array.from({length: beatsPerMeasure}).map((_, index) => (
          <View
            key={index}
            style={[
              styles.beatIndicator,
              beat === index + 1 && styles.activeBeat,
              index === 0 && styles.accentBeat,
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
    backgroundColor: '#fff',
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
    backgroundColor: '#007AFF',
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
    backgroundColor: '#007AFF',
    transform: [{scale: 1.2}],
  },
  accentBeat: {
    backgroundColor: '#FF3B30',
  },
});
