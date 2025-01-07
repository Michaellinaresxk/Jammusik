import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalColors} from '../../theme/Theme';

export const StatsOverview = ({totalSongs, completedSongs}) => {
  const completionRate =
    totalSongs > 0 ? Math.round((completedSongs / totalSongs) * 100) : 0;

  return (
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <Icon name="musical-notes" size={24} color={globalColors.primary} />
        <Text style={styles.statNumber}>{totalSongs}</Text>
        <Text style={styles.statLabel}>Total Songs</Text>
      </View>

      <View style={styles.statCard}>
        <Icon name="checkmark-circle" size={24} color={globalColors.primary} />
        <Text style={styles.statNumber}>{completedSongs}</Text>
        <Text style={styles.statLabel}>Completed</Text>
      </View>

      <View style={styles.statCard}>
        <Icon name="trending-up" size={24} color={globalColors.primary} />
        <Text style={styles.statNumber}>{completionRate}%</Text>
        <Text style={styles.statLabel}>Progress</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: globalColors.secondary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '30%',
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
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: globalColors.light,
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
    color: globalColors.terceary,
  },
});
