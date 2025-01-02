import React from 'react';
import {globalColors} from '../../theme/Theme';
import {PrimaryIcon} from '../shared/PrimaryIcon';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  songCounter: number;
};

export const SongCounter = ({songCounter}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Num tracks:</Text>
      <View style={styles.counterContent}>
        <PrimaryIcon
          name="musical-notes-sharp"
          size={22}
          color={globalColors.primary}
        />
        <Text style={styles.number}>{songCounter}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: 'bold',
    color: globalColors.primaryDark,
  },
  counterContent: {
    flexDirection: 'row',
    gap: 5,
    backgroundColor: globalColors.primaryAlt,
    padding: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  number: {
    color: globalColors.primary,
    fontSize: 18,
  },
});
