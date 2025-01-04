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
import {LyricLine} from '../../../types/songTypes';
import {lyricsService} from '../../../infra/api/LyricsService';

export const LyricsView = ({artist, title, onClose}) => {
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingStatus, setLoadingStatus] = useState('Searching for lyrics...');

  const scrollViewRef = useRef<ScrollView>(null);
  const animatedValues = useRef<Animated.Value[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        console.log('Starting lyrics fetch...');
        setIsLoading(true);
        setError(null);
        setLoadingStatus('Searching for lyrics...');

        if (!artist || !title) {
          throw new Error('Artist and song title required');
        }

        const lyricsData = await lyricsService.getLyricsByArtistAndTitle(
          artist,
          title,
        );

        console.log('Lyrics fetched successfully:', lyricsData.length, 'lines');

        if (lyricsData.length === 0) {
          throw new Error('No lyrics found');
        }

        setLyrics(lyricsData);
        animatedValues.current = lyricsData.map(() => new Animated.Value(0));
        setLoadingStatus('');
      } catch (error: any) {
        console.error('Error in fetchLyrics:', error);
        setError(error.message || 'Error loading lyric');
        setLyrics([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLyrics();

    // Cleanup
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [artist, title]);

  // Timer effect for playback
  useEffect(() => {
    if (isPlaying) {
      console.log('Starting playback');
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => {
          const lastLine = lyrics[lyrics.length - 1];
          // Reset if we reach the end
          if (lastLine && prev >= lastLine.endTime) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 50; // Smaller increments for smoother animation
        });
      }, 50);
    } else {
      console.log('Stopping playback');
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, lyrics]);

  // Animation effect for lyrics
  useEffect(() => {
    if (!lyrics.length) return;

    // Initialize animated values if needed
    if (animatedValues.current.length !== lyrics.length) {
      animatedValues.current = lyrics.map(() => new Animated.Value(0));
    }

    // Find current active line
    const currentLineIndex = lyrics.findIndex(
      line => currentTime >= line.startTime && currentTime <= line.endTime,
    );

    console.log(
      'Current time:',
      currentTime,
      'Current line:',
      currentLineIndex,
    );

    if (currentLineIndex !== -1) {
      // Animate all lines
      lyrics.forEach((_, index) => {
        Animated.timing(animatedValues.current[index], {
          toValue: index === currentLineIndex ? 1 : 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });

      // Scroll to current line
      scrollViewRef.current?.scrollTo({
        y: Math.max(0, currentLineIndex * 60 - 100),
        animated: true,
      });
    }
  }, [currentTime, lyrics]);

  const handleRetry = () => {
    setCurrentTime(0);
    setIsPlaying(false);
    setError(null);
    setIsLoading(true);

    // Re-trigger the useEffect
    const fetchLyrics = async () => {
      try {
        setLoadingStatus('Reintentando...');
        const lyricsData = await lyricsService.getLyricsByArtistAndTitle(
          artist,
          title,
        );
        setLyrics(lyricsData);
        animatedValues.current = lyricsData.map(() => new Animated.Value(0));
        setError(null);
      } catch (error: any) {
        setError(error.message || 'Error al cargar la letra');
      } finally {
        setIsLoading(false);
        setLoadingStatus('');
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
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <PrimaryIcon
              name="close-circle"
              size={28}
              color={globalColors.secondary}
            />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text
              style={styles.songTitle}
              numberOfLines={1}
              ellipsizeMode="tail">
              {title}
            </Text>
            <Text
              style={styles.artistName}
              numberOfLines={1}
              ellipsizeMode="tail">
              {artist}
            </Text>
          </View>
          <TouchableOpacity onPress={handleRetry}>
            <PrimaryIcon
              name="refresh"
              size={28}
              color={globalColors.secondary}
            />
          </TouchableOpacity>
        </View>

        {/* Content */}
        {isLoading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={globalColors.primary} />
            <Text style={styles.loadingText}>{loadingStatus}</Text>
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Text style={styles.errorIcon}>❌</Text>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
              <Text style={styles.retryText}>Try again</Text>
            </TouchableOpacity>
          </View>
        ) : lyrics.length === 0 ? (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>No lyrics found</Text>
            <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
              <Text style={styles.retryText}>Try again</Text>
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
                          outputRange: [0, -10],
                        }),
                      },
                    ],
                    opacity: animatedValues.current[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.6, 1],
                    }),
                    scale: animatedValues.current[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.05],
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

        {/* Controls - Only show if we have lyrics */}
        {!isLoading && !error && lyrics.length > 0 && (
          <View style={styles.controls}>
            <TouchableOpacity
              onPress={() => {
                console.log('Play/Pause pressed. Current state:', isPlaying);
                // Reset to beginning if at end
                if (currentTime >= lyrics[lyrics.length - 1]?.endTime) {
                  setCurrentTime(0);
                }
                setIsPlaying(!isPlaying);
              }}
              style={styles.controlButton}>
              <PrimaryIcon
                name={isPlaying ? 'pause-circle' : 'play-circle'}
                size={50}
                color={globalColors.primary}
              />
            </TouchableOpacity>
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
    // padding: 10,
    backgroundColor: globalColors.light,
    borderTopWidth: 1,
    borderTopColor: globalColors.primaryAlt,
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
  loadingText: {
    marginTop: 16,
    color: globalColors.secondary,
    fontSize: 16,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
});
