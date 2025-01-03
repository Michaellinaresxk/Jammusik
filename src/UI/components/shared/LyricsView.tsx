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
  ActivityIndicator,
} from 'react-native';
import {PrimaryIcon} from '../../components/shared/PrimaryIcon';
import {globalColors} from '../../theme/Theme';
import {LyricLine, LyricsViewProps} from '../../../types/songTypes';
import {musixmatchService} from '../../../infra/api/Musixmatch';

export const LyricsView: React.FC<LyricsViewProps> = ({
  artist,
  title,
  onClose,
}) => {
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isSyncMode, setIsSyncMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const scrollViewRef = useRef<ScrollView>(null);
  const animatedValues = useRef<Animated.Value[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const lyricsData = await musixmatchService.getLyricsByArtistAndTitle(
          artist,
          title,
        );
        setLyrics(lyricsData);
        animatedValues.current = lyricsData.map(() => new Animated.Value(0));
      } catch (error) {
        console.error('Error fetching lyrics:', error);
        setError('No se pudieron cargar las letras');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLyrics();
  }, [artist, title]);

  // Manage playback and time
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => prev + 100);
      }, 100);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying]);

  // Animate current lines
  useEffect(() => {
    lyrics.forEach((line, index) => {
      if (currentTime >= line.startTime && currentTime <= line.endTime) {
        Animated.timing(animatedValues.current[index], {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();

        // Scroll to the current line
        scrollViewRef.current?.scrollTo({
          y: index * 40, // Approximate height of each line
          animated: true,
        });
      } else {
        Animated.timing(animatedValues.current[index], {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    });
  }, [currentTime, lyrics]);

  const handleSyncToggle = () => {
    setIsSyncMode(!isSyncMode);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRetry = () => {
    const fetchLyrics = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const lyricsData = await musixmatchService.getLyricsByArtistAndTitle(
          artist,
          title,
        );
        setLyrics(lyricsData);
        animatedValues.current = lyricsData.map(() => new Animated.Value(0));
      } catch (error) {
        console.error('Error fetching lyrics:', error);
        setError('No se pudieron cargar las letras');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLyrics();
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

        {/* Content */}
        {isLoading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={globalColors.primary} />
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
              <Text style={styles.retryText}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView
            ref={scrollViewRef}
            style={styles.lyricsContainer}
            showsVerticalScrollIndicator={false}>
            {lyrics.map((line, index) => (
              <Animated.Text
                key={index}
                style={[
                  styles.lyricLine,
                  {
                    transform: [
                      {
                        translateY: animatedValues.current[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -5],
                        }),
                      },
                    ],
                    opacity: animatedValues.current[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.6, 1],
                    }),
                  },
                  currentTime >= line.startTime &&
                    currentTime <= line.endTime &&
                    styles.activeLine,
                ]}>
                {line.text}
              </Animated.Text>
            ))}
          </ScrollView>
        )}

        {/* Controls */}
        {!isLoading && !error && (
          <View style={styles.controls}>
            <TouchableOpacity
              onPress={handlePlayPause}
              style={styles.controlButton}>
              <PrimaryIcon
                name={isPlaying ? 'pause-circle' : 'play-circle'}
                size={50}
                color={globalColors.primary}
              />
            </TouchableOpacity>

            {isSyncMode && (
              <TouchableOpacity
                onPress={() => {
                  // Implement synchronization saving
                  onClose();
                }}
                style={styles.controlButton}>
                <PrimaryIcon
                  name="save"
                  size={40}
                  color={globalColors.primary}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: globalColors.secondary,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    padding: 12,
    backgroundColor: globalColors.primary,
    borderRadius: 8,
  },
  retryText: {
    color: globalColors.light,
    fontSize: 16,
  },
  controlButton: {
    padding: 10,
  },
});
