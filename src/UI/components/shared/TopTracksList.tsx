// src/components/TopTracksList.tsx
import React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import {TopTrackCard} from './cards/TopTrackCard';
import {useTopTracks} from '../../../hooks/useTopTracks';
import type {Track} from '../../../types/tracksTypes';

export const TopTracksList: React.FC = () => {
  const {tracks, isLoading, error} = useTopTracks();

  // const tracks = [
  //   {
  //     id: '1',
  //     name: 'Bohemian Rhapsody',
  //     artist: 'Queen',
  //     album: 'A Night at the Opera',
  //     image: 'https://i.scdn.co/image/ab67616d00001e02633a2d775747bccfbcb17a45',
  //   },
  //   {
  //     id: '2',
  //     name: 'Hotel California',
  //     artist: 'Eagles',
  //     album: 'Hotel California',
  //     image: 'https://i.scdn.co/image/ab67616d00001e02153d79816d853f2694b2cc70',
  //   },
  //   {
  //     id: '3',
  //     name: 'Billie Jean',
  //     artist: 'Michael Jackson',
  //     album: 'Thriller',
  //     image: 'https://i.scdn.co/image/ab67616d00001e0282650287d5e7ba2b95a8511f',
  //   },
  //   {
  //     id: '4',
  //     name: 'Shape of You',
  //     artist: 'Ed Sheeran',
  //     album: '÷ (Divide)',
  //     image: 'https://i.scdn.co/image/ab67616d00001e02ba5db46f4b838ef6027e6f96',
  //   },
  //   {
  //     id: '5',
  //     name: 'Stairway to Heaven',
  //     artist: 'Led Zeppelin',
  //     album: 'Led Zeppelin IV',
  //     image: 'https://i.scdn.co/image/ab67616d00001e02cd25f93f3a25c99a33b0e988',
  //   },
  // ];

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const handleTrackPress = (track: Track) => {
    // Handle track selection - you can navigate to details or add to playlist
    console.log('Track selected:', track.id);
  };

  return (
    <FlatList
      data={tracks}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <TopTrackCard track={item} onPress={() => handleTrackPress(item)} />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingVertical: 16,
  },
  errorText: {
    color: '#ff0033',
    fontSize: 16,
  },
});
