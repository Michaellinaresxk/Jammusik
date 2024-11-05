import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {globalColors} from '../../theme/Theme';
import {PrimaryIcon} from './PrimaryIcon';
import useAuthStatus from '../../../hooks/useAuthStatus';

export const UserAvatar = () => {
  const {userName} = useAuthStatus();
  return (
    <View style={styles.userIconContent}>
      <PrimaryIcon name="person-circle-outline" color={globalColors.primary} />
      <Text style={styles.userName}>{userName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  userIconContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 30,
    marginBottom: 30,
  },
  userName: {
    color: globalColors.terceary,
    fontSize: 20,
  },
  brandLogo: {
    position: 'absolute',
    bottom: 0,
  },
});
