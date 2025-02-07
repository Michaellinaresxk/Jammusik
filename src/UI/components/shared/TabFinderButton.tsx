import React from 'react';
import {Alert, Linking} from 'react-native';
import {useTabFinder} from '../../../hooks/useTabFinder';
import {PrimaryButton} from './PrimaryButton';

export const TabFinderButton = ({artist, title, style}) => {
  const {findTab, loading, error} = useTabFinder();

  const handlePress = async () => {
    try {
      const url = await findTab(artist, title);
      if (url) {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Cannot open this URL');
        }
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to open tab URL');
    }
  };

  return (
    <PrimaryButton
      label={loading ? 'Finding tabs...' : 'Find Tabs'}
      onPress={handlePress}
      disabled={loading}
      style={style}
    />
  );
};
