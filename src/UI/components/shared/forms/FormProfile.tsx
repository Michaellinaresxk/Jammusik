import React from 'react';
import {Alert, Text, TextInput, View} from 'react-native';
import {globalColors, globalFormStyles} from '../../../theme/Theme';
import {PrimaryButton} from '../PrimaryButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamsList} from '../../../routes/StackNavigator';
import {useUserService} from '../../../../context/UserServiceContext';

type ProfileForm = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
};

export const FormProfile = ({
  email,
  setEmail,
  name,
  setName,
  userId,
  setUserId,
}: ProfileForm) => {
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
    <View style={globalFormStyles.containerForm}>
      <Text style={globalFormStyles.labelTitle}>General Information:</Text>

      <View style={globalFormStyles.form}>
        <View>
          <TextInput
            style={globalFormStyles.inputLogin}
            placeholderTextColor="#838282"
            placeholder="Name"
            value={name}
            autoCorrect={false}
            onChangeText={text => setName(text)}
          />

          <TextInput
            style={globalFormStyles.inputLogin}
            placeholderTextColor="#838282"
            keyboardType="email-address"
            placeholder="Email"
            value={email}
            autoCorrect={false}
            onChangeText={text => setEmail(text)}
          />

          <TextInput
            style={globalFormStyles.inputLogin}
            placeholder="userId"
            value={userId}
            autoCorrect={false}
            placeholderTextColor="#838282"
            onChangeText={text => setUserId(text)}
          />
        </View>
        <View style={{marginTop: 20}}>
          <PrimaryButton
            label={'LOG-OUT'}
            bgColor={globalColors.primary}
            borderRadius={5}
            colorText={globalColors.secondary}
            btnFontSize={20}
            onPress={logOutConfirmation}
          />
        </View>
      </View>
    </View>
  );
};
