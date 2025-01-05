import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {globalColors} from '../../theme/Theme';

const {width} = Dimensions.get('window');

export const ExploreScreen = () => {
  // Mock data
  const topSongs = [
    {id: 1, title: 'Song Name', artist: 'Artist', plays: '1.2M'},
    {id: 2, title: 'Another Song', artist: 'Artist 2', plays: '900K'},
    // Agrega más canciones según necesites
  ];

  const featuredArtists = [
    {id: 1, name: 'Artist Name', genre: 'Pop'},
    {id: 2, name: 'Artist Two', genre: 'Rock'},
    // Más artistas
  ];

  const tools = [
    {id: 1, name: 'Metronome', icon: '🎵'},
    {id: 2, name: 'Tuner', icon: '🎸'},
    // Más herramientas
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
      </View>

      {/* Recently Played Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recently Played</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}>
          {[1, 2, 3].map(item => (
            <TouchableOpacity key={item} style={styles.recentCard}>
              <View style={styles.recentImagePlaceholder} />
              <Text style={styles.recentTitle}>Recent Track {item}</Text>
              <Text style={styles.recentSubtitle}>Artist {item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Top 10 This Week Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top 10 This Week</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllButton}>See All</Text>
          </TouchableOpacity>
        </View>
        {topSongs.slice(0, 3).map((song, index) => (
          <TouchableOpacity key={song.id} style={styles.songRow}>
            <Text style={styles.songRank}>{index + 1}</Text>
            <View style={styles.songImagePlaceholder} />
            <View style={styles.songInfo}>
              <Text style={styles.songTitle}>{song.title}</Text>
              <Text style={styles.songArtist}>{song.artist}</Text>
            </View>
            <Text style={styles.songPlays}>{song.plays}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Music Tools Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Music Tools</Text>
        <View style={styles.toolsGrid}>
          {tools.map(tool => (
            <TouchableOpacity key={tool.id} style={styles.toolCard}>
              <Text style={styles.toolIcon}>{tool.icon}</Text>
              <Text style={styles.toolName}>{tool.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Featured Artists */}
      <View style={styles.section}>
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070c0d', // secondary
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: globalColors.primary,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#F0F7EE', // primaryaryAlt4
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F0F7EE',
    marginBottom: 15,
  },
  seeAllButton: {
    color: '#18998B', // primary
    fontSize: 16,
  },
  horizontalScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  recentCard: {
    width: width * 0.4,
    marginRight: 15,
  },
  recentImagePlaceholder: {
    width: '100%',
    height: width * 0.4,
    backgroundColor: '#186D65', // primaryDark1
    borderRadius: 8,
    marginBottom: 8,
  },
  recentTitle: {
    color: '#F0F7EE',
    fontSize: 16,
    fontWeight: '600',
  },
  recentSubtitle: {
    color: '#838282', // terceary
    fontSize: 14,
  },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#184945', // primaryDark
    padding: 12,
    borderRadius: 8,
  },
  songRank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6ADEC9', // primaryaryAlt2
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
});
