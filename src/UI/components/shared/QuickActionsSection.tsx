import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-vector-icons/Icon';
import {globalColors} from '../../theme/Theme';
import {useNavigation} from '@react-navigation/native';

export const QuickActionsSection = () => {
  const navigation = useNavigation();
  return (
    <>
      {/* Quick Actions Section */}
      <View style={styles.quickActionsContainer}>
        <TouchableOpacity
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('Library')}>
          <Icon name="library" size={22} color={globalColors.secondary} />
          <Text style={styles.quickActionText}>Library</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('Playlists')}>
          <Icon name="list" size={22} color={globalColors.secondary} />
          <Text style={styles.quickActionText}>Playlists</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('ExploreScreen')}>
          <Icon name="compass" size={22} color={globalColors.secondary} />
          <Text style={styles.quickActionText}>Explore</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: globalColors.primary,
  },
  quickActionButton: {
    alignItems: 'center',
    padding: 10,
  },
  quickActionText: {
    color: globalColors.secondary,
    marginTop: 5,
    fontSize: 12,
  },
});
