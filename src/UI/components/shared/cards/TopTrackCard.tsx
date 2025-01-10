import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import type {Track} from '../../../../types/tracksTypes';
import {globalColors} from '../../../theme/Theme';

interface TrackCardProps {
  track: Track;
  onPress: () => void;
}

export const TopTrackCard: React.FC<TrackCardProps> = ({track, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {track.image ? (
        <Image
          source={{uri: track.image}}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]} />
      )}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {track.name}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {track.artist}
        </Text>
        <Text style={styles.album} numberOfLines={1}>
          {track.album}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  imagePlaceholder: {
    backgroundColor: globalColors.primaryDark1,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: globalColors.primaryaryAlt4,
    marginBottom: 4,
  },
  artist: {
    fontSize: 14,
    color: globalColors.terceary,
    marginBottom: 2,
  },
  album: {
    fontSize: 12,
    color: globalColors.terceary,
    opacity: 0.8,
  },
});
