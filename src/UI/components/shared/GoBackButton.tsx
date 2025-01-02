import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalColors} from '../../theme/Theme';
import {useRoute} from '@react-navigation/native';
import {RootStackParamsList} from '../../routes/AppNavigator';

type Props = {
  bgColor: string;
};

export const GoBackButton = ({bgColor = globalColors.primary}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  const route = useRoute();

  return (
    <Pressable
      style={
        route.name === 'HomeScreen'
          ? styles.goBackDisable
          : styles.goBackContent
      }
      onPress={() => navigation.goBack()}>
      <Icon name="arrow-back-sharp" color={bgColor} size={30} />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  goBackContent: {
    fontSize: 15,
    fontWeight: 'bold',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
    position: 'absolute',
    top: 57,
    marginLeft: 20,
  },
  goBackDisable: {
    display: 'none',
  },
});
