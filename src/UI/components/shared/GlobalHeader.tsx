import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {globalColors, globalStyles} from '../../theme/Theme';
import {images} from '../../../assets/img/Images';
import {GoBackButton} from './GoBackButton';
import {useRoute} from '@react-navigation/native';

const image = {
  uri: images.homeBackground,
};

type Props = {
  headerTitle: string;
  artist?: string;
  hideBackButton?: boolean;
};

export const GlobalHeader = ({headerTitle, artist, hideBackButton}: Props) => {
  const route = useRoute();
  const isHomeScreen = route.name === 'HomeScreen';
  return (
    <>
      <ImageBackground
        source={image}
        resizeMode="cover"
        alt="Imagen de fondo"
        style={styles.headerImage}>
        <View style={globalStyles.overlay}>
          {/* We only show the button if we are not in Home and hideBackButton is false. */}
          {!isHomeScreen && !hideBackButton && (
            <GoBackButton bgColor={globalColors.light} />
          )}
          <View style={styles.container}>
            <Text style={styles.title}>{headerTitle}</Text>
            <Text style={styles.artist}>{artist}</Text>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    height: 200,
  },
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  title: {
    color: globalColors.light,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  artist: {
    color: globalColors.light,
    fontSize: 18,
    fontWeight: '300',
    marginTop: 5,
  },
});
