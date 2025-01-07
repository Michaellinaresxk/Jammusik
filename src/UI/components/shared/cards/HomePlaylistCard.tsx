import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {globalColors} from '../../../theme/Theme';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  title: string;
  onPress: () => void;
  color: string;
  onShare: () => void;
  // onEdit?: (playlistId: string, title: string) => void;
  // onDelete: (playlistId: string) => void;
};

export const HomePlaylistCard = ({title, onPress, color}: Props) => {
  const shareConfirmation = () =>
    Alert.alert('Are you sure?', 'Do you want to share this playlist?', [
      {
        text: 'UPS! BY MISTAKE',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'YES, SHARE!',
        onPress: () => onShare(),
        style: 'destructive',
      },
    ]);

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
    paddingHorizontal: 5,
    fontSize: 20,
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
