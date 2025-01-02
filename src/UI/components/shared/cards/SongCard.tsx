import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {globalColors} from '../../../theme/Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSongState} from '../../../../store/useSongState';
import {auth} from '../../../../infra/api/firebaseConfig';

interface Props {
  title: string;
  artist: string;
  isDone: boolean;
  songId: string;
  songKey?: string;
  color?: string;
  onPress?: () => void;
  resetToggle?: boolean;
}

export const SongCard = ({
  title,
  artist,
  color,
  onPress,
  isDone,
  songId,
  resetToggle,
}: Props) => {
  const [changeIcon, setChangeIcon] = useState(isDone);
  const userId = auth.currentUser?.uid;

  const toggleIsDone = useSongState(state => state.toggleIsDone);

  const handlePressIcon = async () => {
    if (userId && songId) {
      await toggleIsDone(userId, songId, changeIcon);
      setChangeIcon(prev => !prev);
    }
  };

  useEffect(() => {
    setChangeIcon(isDone);
  }, [isDone, resetToggle]);

  return (
    <TouchableOpacity
      style={[
        styles.songCard,
        {backgroundColor: changeIcon ? '#cccccc' : color},
      ]}
      onPress={onPress}>
      <View style={styles.containerCard}>
        <View>
          <Text style={styles.songCardTitle}>{title}</Text>
          <Text style={styles.songCardArtist}>- {artist}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Icon
            name={changeIcon ? 'checkmark-done-sharp' : 'power-sharp'}
            color={globalColors.light}
            size={30}
            onPress={() => handlePressIcon()}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  songCard: {
    borderRadius: 10,
    height: 85,
    width: 350,
    maxWidth: '100%',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  containerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  songCardTitle: {
    color: globalColors.light,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  songCardArtist: {
    color: globalColors.light,
    fontSize: 15,
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 15,
  },
});
