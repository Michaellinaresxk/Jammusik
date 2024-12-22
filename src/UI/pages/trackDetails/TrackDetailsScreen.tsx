
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {type NavigationProp, useNavigation} from '@react-navigation/native';
import {useTrackDetails} from '../../../hooks/useTrackDetails';
import {globalColors} from '../../theme/Theme';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamsList} from '../../routes/StackNavigator';
import Icon from 'react-native-vector-icons/Ionicons';

export const TrackDetailsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  const params =
    useRoute<RouteProp<RootStackParamsList, 'TrackDetailsScreen'>>().params;

  const {trackName, artistName} = params;
  const {details, loading, error} = useTrackDetails(trackName, artistName);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={globalColors.primary} />
      </View>
    );
  }

  if (error || !details) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Failed to load track details</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Pressable
        style={styles.goBackContent}
        onPress={() => navigation.navigate('HomeScreen')}>
        <Icon
          name="arrow-back-sharp"
          color={globalColors.primaryDark}
          size={30}
        />
      </Pressable>
      <Image
        source={{uri: details.imageUrl || 'https://via.placeholder.com/300'}}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{details.name}</Text>
        <Text style={styles.artist}>{details.artist}</Text>

        {details.album && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Album:</Text>
            <Text style={styles.value}>{details.album}</Text>
          </View>
        )}

        {details.duration && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Duration:</Text>
            <Text style={styles.value}>{details.duration}</Text>
          </View>
        )}

        <View style={styles.infoRow}>
          <Text style={styles.label}>Listeners:</Text>
          <Text style={styles.value}>{details.listeners}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Plays:</Text>
          <Text style={styles.value}>{details.playcount}</Text>
        </View>

        {details.description && (
          <View style={styles.description}>
            <Text style={styles.descriptionText}>{details.description}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 270,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  artist: {
    fontSize: 18,
    color: globalColors.primary,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    width: 100,
  },
  value: {
    fontSize: 16,
    flex: 1,
  },
  description: {
    marginTop: 16,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  goBackContent: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  goBackLabel: {
    fontSize: 15,
    color: globalColors.primaryDark,
  },
});
