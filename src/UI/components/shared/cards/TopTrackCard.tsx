// TopTrackCard
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {globalColors} from '../../../theme/Theme';

export const TopTrackCard = ({track}) => {
  const {name, artist, imageUrl} = track;
  // We use a placeholder URL instead of a local image
  const defaultImageUrl = 'https://via.placeholder.com/60';
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => console.log('Selected track:', name)}
      activeOpacity={0.7}>
      <Image
        source={{
          uri: imageUrl || defaultImageUrl,
        }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.trackName} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.artistName} numberOfLines={1}>
          {artist}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: globalColors.primary,
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  trackName: {
    flexWrap: 'wrap',
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  artistName: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
});
