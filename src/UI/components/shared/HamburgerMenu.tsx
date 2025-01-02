import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {PrimaryIcon} from './PrimaryIcon';
import {globalColors} from '../../theme/Theme';
import {RootStackParamsList} from '../../routes/AppNavigator';

type Props = {
  color?: string;
};

export const HamburgerMenu = ({color = globalColors.light}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

  return (
    <Pressable
      style={styles.menuButton}
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}>
      <PrimaryIcon name="menu-sharp" size={40} color={color}></PrimaryIcon>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    marginRight: 10,
    position: 'absolute',
    top: 40,
    right: 0,
    padding: 10,
    zIndex: 1,
  },
});
