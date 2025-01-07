import {FlatList, StyleSheet, Text, View, ImageBackground} from 'react-native';
import {SharedPlaylistCard} from '../../components/shared/cards/SharedPlaylistCard';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalColors, globalStyles} from '../../theme/Theme';
import {useCallback, useEffect, useState} from 'react';
import {GoBackButton} from '../../components/shared/GoBackButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import {images} from '../../../assets/img/Images';
import {PlaylistView} from '../../../views/PlaylistView';
import {usePlaylistService} from '../../../context/PlaylistServiceContext';
import {getAuth} from 'firebase/auth';
import Toast from 'react-native-toast-message';

export const SharedPlaylistsScreen = () => {
  const [sharedPlaylists, setSharedPlaylists] = useState<PlaylistView[]>([]);
  const playlistService = usePlaylistService();
  const auth = getAuth();

  const image = {
    uri: images?.loginBackground || '',
  };

  const loadSharedPlaylists = useCallback(async () => {
    if (!auth.currentUser) return;

    try {
      const playlists = await playlistService.getSharedPlaylists(
        auth.currentUser.uid,
      );
      setSharedPlaylists(playlists);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to load shared playlists',
      });
    }
  }, [auth.currentUser, playlistService]);

  useEffect(() => {
    loadSharedPlaylists();
  }, [loadSharedPlaylists]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={image} resizeMode="cover">
        <View style={globalStyles.overlay}>
          <View>
            <GoBackButton bgColor={globalColors.primary} />
            <View style={styles.subHeader}>
              <Icon
                name="musical-notes-outline"
                size={40}
                color={globalColors.primaryAlt}
              />
              <Text style={styles.subHeaderText}>Manage shared playlists</Text>
            </View>

            <View style={styles.header}>
              <Icon
                name="share-social"
                size={30}
                color={globalColors.primary}
              />
              <Text style={styles.headerTitle}>Shared Playlists</Text>
            </View>
            {sharedPlaylists.length === 0 ? (
              <View style={styles.emptyState}>
                <Icon
                  name="musical-notes"
                  size={80}
                  color={globalColors.secondary}
                />
                <Text style={styles.emptyTitle}>No shared playlists yet</Text>
                <Text style={styles.emptySubtitle}>
                  Shared playlists will appear here
                </Text>
              </View>
            ) : (
              <FlatList
                data={sharedPlaylists}
                renderItem={({item}) => (
                  <SharedPlaylistCard
                    playlist={item}
                    onAccept={function (): void {
                      throw new Error('Function not implemented.');
                    }}
                    onReject={function (): void {
                      throw new Error('Function not implemented.');
                    }}
                  />
                )}
                contentContainerStyle={styles.list}
              />
            )}
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: globalColors.secondary + '20',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 12,
    color: globalColors.light,
  },
  subHeader: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: globalColors.primaryAlt + '10',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 16,
    color: globalColors.light,
    marginTop: 8,
  },

  list: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    color: globalColors.primaryDark,
  },
  emptySubtitle: {
    fontSize: 16,
    color: globalColors.secondary,
    marginTop: 8,
  },
});
