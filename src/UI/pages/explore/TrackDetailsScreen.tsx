import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {globalColors} from '../../theme/Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackParamsList} from '../../routes/AppNavigator';
import {Track} from '../../../types/tracksTypes';
import spotifyConfig from '../../../infra/api/spotifyConfig';

type Props = StackScreenProps<RootStackParamsList, 'TrackDetailsScreen'>;

export const TrackDetailsScreen: React.FC<Props> = ({route, navigation}) => {
  const [trackDetails, setTrackDetails] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {trackId} = route.params;

  useEffect(() => {
    const fetchTrackDetails = async () => {
      if (!trackId) {
        setError('No track ID provided');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching details for track:', trackId);
        const details = await spotifyConfig.getTrackDetails(trackId);
        console.log('Received track details:', details);
        setTrackDetails(details);
      } catch (err) {
        console.error('Error fetching track details:', err);
        setError('Error loading track details');
      } finally {
        setLoading(false);
      }
    };

    fetchTrackDetails();
  }, [trackId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={globalColors.primaryaryAlt2} />
      </View>
    );
  }
  if (error || !trackDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Track not found'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon
            name="chevron-back"
            size={24}
            color={globalColors.primaryaryAlt4}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        {trackDetails.image && (
          <Image
            source={{uri: trackDetails.image}}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{trackDetails.name}</Text>
        <Text style={styles.artist}>{trackDetails.artist}</Text>
        <Text style={styles.album}>{trackDetails.album}</Text>

        {/* {trackDetails.popularity && (
          <View style={styles.popularityContainer}>
            <Text style={styles.popularityText}>
              Popularity: {trackDetails.popularity}/100
            </Text>
          </View>
        )} */}

        {trackDetails.preview_url && (
          <TouchableOpacity style={styles.previewButton}>
            <Text style={styles.previewButtonText}>Preview Song</Text>
          </TouchableOpacity>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalColors.secondary,
  },
  loadingText: {
    color: globalColors.primaryaryAlt4,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalColors.secondary,
  },
  errorText: {
    color: '#ff0033',
    fontSize: 16,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 8,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: globalColors.primaryaryAlt4,
    marginBottom: 8,
  },
  artist: {
    fontSize: 18,
    color: globalColors.terceary,
    marginBottom: 4,
  },
  album: {
    fontSize: 16,
    color: globalColors.terceary,
    opacity: 0.8,
    marginBottom: 20,
  },
  popularityContainer: {
    backgroundColor: globalColors.primaryDark,
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  popularityText: {
    color: globalColors.primaryaryAlt4,
    fontSize: 16,
    textAlign: 'center',
  },
  previewButton: {
    backgroundColor: globalColors.primaryaryAlt2,
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  previewButtonText: {
    color: globalColors.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
});
