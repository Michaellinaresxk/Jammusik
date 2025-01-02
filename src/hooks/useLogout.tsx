import {useNavigation} from '@react-navigation/native';
import {useUserService} from '../context/UserServiceContext';

export const useLogout = () => {
  const navigation = useNavigation();

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
