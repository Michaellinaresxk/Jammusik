import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import {PrimaryIcon} from '../../components/shared/PrimaryIcon';
import {globalColors} from '../../theme/Theme';
import {PrimaryButton} from '../../components/shared/PrimaryButton';

interface LyricsViewProps {
  artist: string;
  title: string;
  onClose: () => void;
}

interface LyricLine {
  text: string;
  startTime: number;
  endTime: number;
}

export const LyricsView: React.FC<LyricsViewProps> = ({
  artist,
  title,
  onClose,
}) => {
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isSyncMode, setIsSyncMode] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const animatedValues = useRef<Animated.Value[]>([]);

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        const sampleLyrics: LyricLine[] = [
          {text: 'Verse 1: Sample lyrics line 1', startTime: 0, endTime: 4000},
          {text: 'Sample lyrics line 2', startTime: 4000, endTime: 8000},
        ];
        setLyrics(sampleLyrics);
        animatedValues.current = sampleLyrics.map(() => new Animated.Value(0));
      } catch (error) {
        console.error('Error fetching lyrics:', error);
      }
    };

    fetchLyrics();
  }, [artist, title]);

  const handleSyncToggle = () => {
    setIsSyncMode(!isSyncMode);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeButton}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <PrimaryIcon
              name="close-circle"
              size={35}
              color={globalColors.secondary}
            />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.songTitle}>{title}</Text>
            <Text style={styles.artistName}>{artist}</Text>
          </View>
          <TouchableOpacity
            onPress={handleSyncToggle}
            style={styles.syncButton}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <PrimaryIcon
              name={isSyncMode ? 'sync' : 'sync-outline'}
              size={24}
              color={globalColors.secondary}
            />
          </TouchableOpacity>
        </View>

        {/* Lyrics Content */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.lyricsContainer}
          showsVerticalScrollIndicator={false}>
          {lyrics.map((line, index) => (
            <Animated.Text
              key={index}
              style={[
                styles.lyricLine,
                currentTime >= line.startTime &&
                  currentTime <= line.endTime &&
                  styles.activeLine,
              ]}>
              {line.text}
            </Animated.Text>
          ))}
        </ScrollView>

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity onPress={handlePlayPause}>
            <PrimaryIcon
              name={isPlaying ? 'pause-circle' : 'play-circle'}
              size={50}
              color={globalColors.primary}
            />
          </TouchableOpacity>

          {isSyncMode && (
            <TouchableOpacity
              onPress={() => {
                // Implementar guardado de sincronización
                onClose();
              }}>
              <PrimaryIcon name="save" size={40} color={globalColors.primary} />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: globalColors.light,
  },
  container: {
    flex: 1,
    backgroundColor: globalColors.light,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: globalColors.primary,
    borderBottomWidth: 1,
    borderBottomColor: globalColors.terceary,
  },
  closeButton: {
    padding: 8,
    zIndex: 1,
  },
  syncButton: {
    padding: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  songTitle: {
    color: globalColors.secondary,
    fontSize: 20,
    fontWeight: '600',
  },
  artistName: {
    color: globalColors.secondary,
    fontSize: 16,
    opacity: 0.8,
  },
  lyricsContainer: {
    flex: 1,
    padding: 16,
  },
  lyricLine: {
    color: globalColors.secondary,
    fontSize: 20,
    marginVertical: 8,
    textAlign: 'center',
    opacity: 0.8,
  },
  activeLine: {
    color: globalColors.primary,
    fontWeight: '700',
    opacity: 1,
  },

  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: globalColors.light,
    borderTopWidth: 1,
    borderTopColor: globalColors.primaryAlt,
    gap: 40, // Espacio entre iconos
  },
});
