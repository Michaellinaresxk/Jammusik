import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {globalColors} from '../../theme/Theme';
import {useTopTracks} from '../../../hooks/useTopTracks';
import {Track} from '../../../types/tracksTypes';
import {HorizontalTopTracks} from '../../components/shared/HorizontalTopTracks';
import {PrimaryIcon} from '../../components/shared/PrimaryIcon';
import {useNewReleases} from '../../../hooks/useNewReleases';
import {NewReleasesContent} from '../../components/shared/NewReleasesContent';

const {width} = Dimensions.get('window');

export const ExploreScreen = () => {
  const {tracks, isLoading, error} = useTopTracks();
  const {
    newReleases,
    isLoading: releasesLoading,
    error: releasesError,
  } = useNewReleases();

  const featuredArtists = [
    {id: 1, name: 'Artist Name', genre: 'Pop'},
    {id: 2, name: 'Artist Two', genre: 'Rock'},
  ];

  const tools = [
    {id: 1, name: 'Metronome', icon: '🎵'},
    {id: 2, name: 'Tuner', icon: '🎸'},
  ];

  const handleTrackPress = (track: Track) => {
    console.log('Track selected:', track);
    Alert.alert('Song details soon...');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
      </View>

      {/* New Releases Component */}
      <NewReleasesContent
        newReleases={newReleases}
        isLoading={releasesLoading}
        error={releasesError}
      />

      {/* <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top 10 This Week</Text>
          <PrimaryIcon
            name={'chevron-forward-sharp'}
            color={globalColors.light}
          />
        </View>
        <HorizontalTopTracks tracks={tracks} onTrackPress={handleTrackPress} />
      </View> */}

      {/* Music Tools Section */}
      {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>Music Tools</Text>
        <View style={styles.toolsGrid}>
          {tools.map(tool => (
            <TouchableOpacity key={tool.id} style={styles.toolCard}>
              <Text style={styles.toolIcon}>{tool.icon}</Text>
              <Text style={styles.toolName}>{tool.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View> */}

      {/* Featured Artists */}
      {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Artists</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}>
          {featuredArtists.map(artist => (
            <TouchableOpacity key={artist.id} style={styles.artistCard}>
              <View style={styles.artistImagePlaceholder} />
              <Text style={styles.artistName}>{artist.name}</Text>
              <Text style={styles.artistGenre}>{artist.genre}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View> */}
      <View style={{marginBottom: 150}}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.secondary,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: globalColors.primary,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: globalColors.secondary,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F0F7EE',
    marginBottom: 15,
  },
  seeAllButton: {
    color: globalColors.primary,
    fontSize: 16,
  },
  horizontalScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },

  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#184945',
    padding: 12,
    borderRadius: 8,
  },
  songRank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6ADEC9',
    width: 30,
  },
  songImagePlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#186D65',
    borderRadius: 4,
    marginRight: 12,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    color: '#F0F7EE',
    fontSize: 16,
    fontWeight: '600',
  },
  songArtist: {
    color: '#838282',
    fontSize: 14,
  },
  songPlays: {
    color: '#6ADEC9',
    fontSize: 12,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  toolCard: {
    width: '48%',
    backgroundColor: '#186D65',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  toolIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  toolName: {
    color: '#F0F7EE',
    fontSize: 16,
    fontWeight: '600',
  },
  artistCard: {
    marginRight: 15,
    width: width * 0.35,
  },
  artistImagePlaceholder: {
    width: width * 0.35,
    height: width * 0.35,
    backgroundColor: '#186D65',
    borderRadius: 100,
    marginBottom: 8,
  },
  artistName: {
    color: '#F0F7EE',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  artistGenre: {
    color: '#838282',
    fontSize: 14,
    textAlign: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
  },

  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -20}, {translateY: -20}],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  previewBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: globalColors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  previewText: {
    color: globalColors.light,
    fontSize: 10,
    fontWeight: '600',
  },

  recentCard: {
    // Actualizar el estilo existente
    position: 'relative',
    width: 150,
    marginRight: 16,
  },

  recentImagePlaceholder: {
    // Actualizar para que coincida con imageContainer
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
  },

  recentTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: globalColors.light,
  },

  recentSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: globalColors.terceary,
  },
});
