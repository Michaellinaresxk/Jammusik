import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
  Linking,
  RefreshControl,
} from 'react-native';
import {PrimaryIcon} from './PrimaryIcon';
import {globalColors} from '../../theme/Theme';
import {NewRelease} from '../../../types/tracksTypes';

interface NewReleasesProps {
  newReleases: NewRelease[];
  isLoading: boolean;
  error: string | null;
  onRefresh?: () => void;
}

export const NewReleasesContent: React.FC<NewReleasesProps> = ({
  newReleases,
  isLoading,
  error,
  onRefresh,
}) => {
  const openInSpotify = async (release: NewRelease) => {
    Alert.alert(
      '🎵 Open in Spotify',
      `¿Do you want to listen to "${release.name}" on Spotify?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Open',
          onPress: async () => {
            try {
              const supported = await Linking.canOpenURL(release.external_url);

              if (supported) {
                await Linking.openURL(release.external_url);
              } else {
                Alert.alert('Error', 'Unable to open Spotify on this device');
              }
            } catch (error) {
              Alert.alert(
                'Error',
                'An error occurred while trying to open Spotify',
              );
            }
          },
        },
      ],
    );
  };

  if (error) return null;

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>New Releases</Text>
        <PrimaryIcon
          name={'chevron-forward-sharp'}
          color={globalColors.light}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator color={globalColors.primary} />
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
          refreshControl={
            onRefresh ? (
              <RefreshControl
                refreshing={isLoading}
                onRefresh={onRefresh}
                colors={[globalColors.primary]}
                tintColor={globalColors.primary}
              />
            ) : undefined
          }>
          {newReleases.map(release => (
            <TouchableOpacity
              key={release.id}
              style={styles.recentCard}
              activeOpacity={0.7}
              onPress={() => openInSpotify(release)}>
              <View style={styles.imageContainer}>
                {release.image ? (
                  <Image
                    source={{uri: release.image}}
                    style={styles.recentImagePlaceholder}
                  />
                ) : (
                  <View style={styles.recentImagePlaceholder} />
                )}
                <View style={styles.statsContainer}>
                  <View style={styles.stat}>
                    <PrimaryIcon
                      name="time"
                      size={12}
                      color={globalColors.light}
                    />
                    <Text style={styles.statText}>
                      {Math.floor(release.duration_ms / 60000)}:
                      {String(
                        Math.floor((release.duration_ms % 60000) / 1000),
                      ).padStart(2, '0')}
                    </Text>
                  </View>
                  <View style={styles.stat}>
                    <PrimaryIcon
                      name="star"
                      size={12}
                      color={globalColors.light}
                    />
                    <Text style={styles.statText}>{release.popularity}</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.recentTitle} numberOfLines={1}>
                {release.name}
              </Text>
              <Text style={styles.recentSubtitle} numberOfLines={1}>
                {release.artist}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F0F7EE',
    marginBottom: 15,
  },
  horizontalScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
  },
  recentCard: {
    position: 'relative',
    width: 150,
    marginRight: 16,
  },
  recentImagePlaceholder: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
  },
  recentTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: globalColors.light,
  },
  recentSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: globalColors.terceary,
  },
  statsContainer: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 4,
    padding: 4,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    color: globalColors.light,
    fontSize: 12,
  },
});
