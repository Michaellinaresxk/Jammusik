import React from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MenuItem} from '../../components/shared/MenuItem';
import {BrandLogo} from '../../components/shared/BrandLogo';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalColors} from '../../theme/Theme';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {PrimaryButton} from '../../components/shared/PrimaryButton';
import {useUserService} from '../../../context/UserServiceContext';
import {RootStackParamsList} from '../../routes/StackNavigator';

export const SettingsScreen = () => {
  const {top} = useSafeAreaInsets();

  const profileItems = [
    {
      name: 'Profile',
      icon: 'construct-sharp',
      component: 'ProfileScreen',
    },
    {
      name: 'About us',
      icon: 'play-sharp',
      component: 'AboutUsScreen',
    },
  ];

  const menuItems = [
    {
      name: "FAQ's",
      icon: 'help-sharp',
      component: 'FaqsScreen',
    },
    {
      name: 'FeedBack',
      icon: 'chatbox-ellipses-sharp',
      component: 'FeedbackScreen',
    },
  ];

  const deleteAccountInfo = [
    {
      name: 'Delete Account',
      icon: 'alert-circle-sharp',
      component: 'DeleteAccountScreen',
    },
  ];

  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

  const userService = useUserService();
  const logoutUser = async () => {
    try {
      await userService.logout();
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error al cerrar sesión: ', error);
    }
  };

  const logOutConfirmation = () =>
    Alert.alert('Are you sure?', 'Do you want to log-out?', [
      {
        text: 'UPS! BY MISTAKE',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'YES, LOG-OUT',
        onPress: () => logoutUser(),
        style: 'destructive',
      },
    ]);

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        marginTop: top,
      }}>
      <Text style={styles.subTitle}>Account Settings:</Text>
      <View style={styles.mainContainer}>
        {profileItems.map((item, index) => (
          <MenuItem
            key={item.component}
            {...item}
            isFirst={index === 0}
            isLast={index === menuItems.length - 1}
          />
        ))}
        <View style={{marginTop: 30}} />

        {menuItems.map((item, index) => (
          <MenuItem
            key={item.component}
            {...item}
            isFirst={index === 0}
            isLast={index === menuItems.length - 1}
          />
        ))}
        <View style={{marginTop: 30}} />

        <View style={{marginTop: 30}} />
        {deleteAccountInfo.map((item, index) => (
          <MenuItem
            key={item.component}
            {...item}
            isFirst={index === 0}
            isLast={index === menuItems.length - 1}
            isOnly={true}
          />
        ))}

        <View style={{marginTop: 30}} />
        <View style={styles.buttonContainer}>
          <PrimaryButton
            label="Logout"
            onPress={() => logOutConfirmation()}
            borderRadius={5}
            colorText={globalColors.primary}
            btnFontSize={17}
            bgColor={globalColors.primaryAlt}
          />
        </View>
        <View style={{marginTop: 10}}>
          <BrandLogo />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 40,
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 50,
    marginRight: 20,
  },
  button: {
    width: 200,
  },
  subTitle: {
    marginBottom: 5,
    marginTop: 40,
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: '900',
    color: globalColors.primaryDark,
  },
});
