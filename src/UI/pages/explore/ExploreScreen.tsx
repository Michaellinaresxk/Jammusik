import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {globalColors} from '../../theme/Theme';
import {HorizontalTopTracks} from '../../components/shared/HorizontalTopTracks';
import {PrimaryIcon} from '../../components/shared/PrimaryIcon';
import {useNewReleases} from '../../../hooks/useNewReleases';
import {NewReleasesContent} from '../../components/shared/NewReleasesContent';
import Icon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

export const ExploreScreen = () => {
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

  const comingSoonFeatures = [
    {
      id: 1,
      title: 'Top Charts',
      description: 'Discover the most popular songs in your region',
      icon: 'stats-chart',
    },
    {
      id: 2,
      title: 'Music Tools',
      description: 'Professional tools for musicians coming soon',
      icon: 'construct',
    },
    {
      id: 3,
      title: 'Featured Artists',
      description: 'Connect with your favorite artists',
      icon: 'people',
    },
  ];

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

      <View style={styles.comingSoonSection}>
        <Text style={styles.comingSoonTitle}>Coming Soon</Text>
        <Text style={styles.comingSoonSubtitle}>
          Exciting new features on the way!
        </Text>

        <View style={styles.featuresContainer}>
          {comingSoonFeatures.map(feature => (
            <View key={feature.id} style={styles.featureCard}>
              <View style={styles.iconContainer}>
                <Icon
                  name={feature.icon}
                  size={24}
                  color={globalColors.primary}
                />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>
                {feature.description}
              </Text>
            </View>
          ))}
        </View>
      </View>
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
  comingSoonSection: {
    padding: 20,
    marginTop: 20,
  },
  comingSoonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: globalColors.light,
    marginBottom: 8,
  },
  comingSoonSubtitle: {
    fontSize: 16,
    color: globalColors.terceary,
    marginBottom: 24,
  },
  featuresContainer: {
    gap: 16,
  },
  featureCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: globalColors.light,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: globalColors.terceary,
    flex: 1,
  },
});
