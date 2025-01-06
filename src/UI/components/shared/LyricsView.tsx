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

interface LyricsViewProps {
  artist: string;
  title: string;
  onClose: () => void;
  onLyricsLoaded?: (hasLyrics: boolean) => void;
}

export const LyricsView: React.FC<LyricsViewProps> = ({
  artist,
  title,
  onClose,
  onLyricsLoaded,
}) => {
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isCached, setIsCached] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingStatus, setLoadingStatus] = useState('Searching for lyrics...');

  const scrollViewRef = useRef<ScrollView>(null);
  const animatedValues = useRef<Animated.Value[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchLyrics = async () => {
      if (!artist || !title) {
        setError('Artist and song title required');
        setIsLoading(false);
        onLyricsLoaded?.(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Verificar si ya tenemos las letras actuales
        if (lyrics.length > 0) {
          setLoadingStatus('Loading cached lyrics...');
          setIsCached(true);
          onLyricsLoaded?.(true);
          return;
        }

        setLoadingStatus('Searching for lyrics...');

        const lyricsData = await lyricsService.getLyricsByArtistAndTitle(
          artist,
          title,
        );

        if (lyricsData.length === 0) {
          throw new Error('No lyrics found');
        }

        // Inicializar las animaciones
        animatedValues.current = lyricsData.map(() => new Animated.Value(0));

        // Actualizar los datos
        setLyrics(lyricsData);
        setLoadingStatus('');
        onLyricsLoaded?.(true);
      } catch (error: any) {
        console.error('Error in fetchLyrics:', error);
        setError(error.message || 'Error loading lyrics');
        setLyrics([]);
        onLyricsLoaded?.(false);
      } finally {
        setIsLoading(false);
        setIsCached(false);
      }
    };

    fetchLyrics();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [artist, lyrics.length, onLyricsLoaded, title]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => {
          const lastLine = lyrics[lyrics.length - 1];
          if (lastLine && prev >= lastLine.endTime) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 50;
        });
      }, 50);
    } else {
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

  useEffect(() => {
    if (!lyrics.length) return;

    const currentLineIndex = lyrics.findIndex(
      line => currentTime >= line.startTime && currentTime <= line.endTime,
    );

    if (currentLineIndex !== -1) {
      lyrics.forEach((_, index) => {
        Animated.timing(animatedValues.current[index], {
          toValue: index === currentLineIndex ? 1 : 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });

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
    setIsCached(false);
    setLyrics([]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}>
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

        {isLoading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={globalColors.primary} />
            <Text style={styles.loadingText}>
              {isCached ? 'Loading cached lyrics...' : loadingStatus}
            </Text>
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
                      {
                        scale: animatedValues.current[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.05],
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

        {!isLoading && !error && lyrics.length > 0 && (
          <View style={styles.controls}>
            <TouchableOpacity
              onPress={() => {
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
