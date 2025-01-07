import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {globalColors} from '../../../theme/Theme';

type Props = {
  title: string;
  onPress: () => void;
  color: string;
  onShare: () => void;
};

export const HomePlaylistCard = ({title, onPress, color}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.playlistCard, {backgroundColor: color}]}
      onPress={onPress}>
      <Text style={styles.playlistCardText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  playlistCard: {
    backgroundColor: globalColors.primary,
    borderRadius: 5,
    height: 160,
    width: 150,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playlistCardText: {
    color: globalColors.light,
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: '400',
  },
  containerIcons: {
    padding: 10,
    gap: 15,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
