// TopTracksList
import React from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import {useTopTracks} from '../../../hooks/useTopTrasks';
import {TopTrackCard} from './cards/TopTrackCard';

const LoadingState = () => (
  <View style={styles.centerContainer}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);
const ErrorState = ({error}) => (
  <View style={styles.centerContainer}>
    <Text style={styles.errorText}>{error}</Text>
  </View>
);
export const TopTracksList = ({track}) => {
  const {loading, error} = useTopTracks();
  if (loading) {
    return <LoadingState />;
  }
  if (error) {
    return <ErrorState error={error} />;
  }
  return (
    <View style={styles.container}>
      <TopTrackCard track={track} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  centerContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 5,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
