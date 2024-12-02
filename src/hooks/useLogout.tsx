import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamsList} from '../UI/routes/StackNavigator';
import {useUserService} from '../context/UserServiceContext';

export const useLogout = () => {
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

  return logoutUser;
};
