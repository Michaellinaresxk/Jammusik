import {StyleSheet} from 'react-native';

export const globalColors = {
  primary: '#82B2A',
  primaryAlt1: '#184945',
  primaryAlt2: '#186D65',

  secondary: '#18998B',
  $secondaryAlt1: '#22AA98',
  $secondaryAlt2: '#6ADEC9',
  $secondaryAlt3: '#A1EEDD',
  $secondaryAlt4: '#F0F7EE',

  light: '#F1FCF9',
  lightAlt: '#F1FCF9',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: globalColors.primary,
  },
  primaryButton: {
    backgroundColor: globalColors.primary,
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: globalColors.background,
    fontSize: 18,
  },
});
