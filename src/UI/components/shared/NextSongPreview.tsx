import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalColors} from '../../theme/Theme';

export const NextSongPreview = ({nextSong}) => {
  if (!nextSong) return null;

  return (
    <View style={styles.nextSongContainer}>
      <View style={styles.nextSongHeader}>
        <Icon name="time" size={20} color={globalColors.primary} />
        <Text style={styles.nextSongTitle}>Next Up</Text>
      </View>
      <View style={styles.nextSongContent}>
        <Text style={styles.songName} numberOfLines={1}>
          {nextSong.title}
        </Text>
        <Text style={styles.artistName} numberOfLines={1}>
          {nextSong.artist}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  nextSongContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  nextSongHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  nextSongTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: globalColors.primaryDark,
  },
  nextSongContent: {
    marginLeft: 28,
  },

  songName: {
    fontSize: 15,
    fontWeight: '500',
    color: globalColors.primary,
  },
  artistName: {
    fontSize: 13,
    color: globalColors.terceary,
  },
});
