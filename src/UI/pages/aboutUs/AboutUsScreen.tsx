import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BrandLogo} from '../../components/shared/BrandLogo';
import {globalColors} from '../../theme/Theme';
import {ScrollView} from 'react-native';
import {usePullRefresh} from '../../../hooks/usePullRefresing';

export const AboutUsScreen = () => {
  const FeatureSection = ({title, description}) => (
    <View style={styles.containerTextos}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.textos}>{description}</Text>
    </View>
  );

  const features = [
    {
      title: 'Smart Music Organization',
      description:
        'We are a sophisticated tool for musicians, offering features focused on playlist management and song organization for both rehearsals and live performances. Our AI-powered features and Spotify integration keep you at the forefront of music trends.',
    },
    {
      title: 'Playlist Creation and Management',
      description:
        'Create custom playlists and add songs with ease. Songs are displayed on interactive cards for easy visualization and tracking. Share your playlists with other users for seamless collaboration.',
    },
    {
      title: 'Advanced Song Features',
      description:
        'Access instant lyrics, AI-generated chord progressions, and detailed song information. Add custom notes, tablature links, and mark songs as played during performances.',
    },
    {
      title: 'Smart Filtering and Updates',
      description:
        'Find songs quickly using multiple filters: by genre, name, or musical key. Stay updated with our weekly top 10 releases from Spotify, keeping your repertoire fresh and current.',
    },
    {
      title: 'Collaborative Features',
      description:
        'Share playlists with other musicians, making band rehearsals and coordination effortless. Create collaborative setlists and share song arrangements with your team.',
    },
  ];

  const {isRefreshing, refresh, top} = usePullRefresh();
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.containerLogo}>
          <BrandLogo />
        </View>
        {features.map((feature, index) => (
          <FeatureSection
            key={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
        <Text style={{...styles.textos, marginBottom: 100}}>
          While this version doesn't play music directly, it provides
          comprehensive tools for playlist management, song organization, and
          musician collaboration, enhanced with AI features and music trend
          integration.
        </Text>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  containerLogo: {
    marginVertical: 80,
  },

  container: {
    flex: 1,
    padding: 20,
  },
  containerTextos: {
    marginVertical: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: globalColors.primaryDark,
    marginBottom: 8,
  },
  textos: {
    fontSize: 16,
    color: globalColors.primaryDark,
    lineHeight: 24,
    marginBottom: 10,
  },
});
