import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {globalColors} from '../../../theme/Theme';

type Props = {
  categoryId?: string;
  title: string;
  onPress: () => void;
};
export const CategoryCardLight = ({title, onPress}: Props) => {
  return (
    <TouchableOpacity style={styles.categoryCard} onPress={onPress}>
      <Text style={styles.categoryCardText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    backgroundColor: globalColors.primaryAlt,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 135,
    width: 150,
    margin: 10,
  },
  categoryCardText: {
    color: globalColors.primary,
    fontSize: 18,
    fontWeight: '300',
    paddingHorizontal: 5,
  },
});
