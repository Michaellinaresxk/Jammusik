import React, {useState} from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {globalColors, globalStyles} from '../../theme/Theme';
import {FormLogin} from '../../components/shared/forms/FormLogin';
import {images} from '../../../assets/img/Images';
import {BrandLogo} from '../../components/shared/BrandLogo';
import {LinkLoginRegister} from '../../components/shared/LinkLoginRegister';
import {useUserService} from '../../../context/UserServiceContext';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const userService = useUserService();
  const navigation = useNavigation();
  const image = {
    uri: images?.loginBackground || '', // Validación para evitar undefined
  };

  const handleLogin = async ({email, password}) => {
    try {
      setIsLoading(true);
      setError('');

      if (!userService?.loginUser) {
        throw new Error('El servicio de usuario no está disponible.');
      }

      await userService.loginUser(email, password);
      // Navega al HomeScreen si el login es exitoso
      navigation.navigate('HomeScreen');
    } catch (error) {
      // Manejo de errores robusto
      const errorMessage =
        error?.code === 'auth/invalid-credential'
          ? 'Invalid credentials'
          : error?.message || 'An unexpected error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.container}>
        <View style={globalStyles.overlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}>
              <View style={styles.containerLogo}>
                <BrandLogo />
              </View>
              <Text style={styles.labelTitle}>Log In</Text>
              <View style={styles.containerForm}>
                <FormLogin
                  onLogin={handleLogin}
                  isLoading={isLoading}
                  error={error}
                  setError={setError}
                  showPassword={showPassword}
                  toggleShowPassword={toggleShowPassword}
                />
                <LinkLoginRegister
                  text="Not a member yet?"
                  link="Register"
                  goTo="RegisterScreen"
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  containerLogo: {
    alignItems: 'center',
    marginTop: 60,
  },
  labelTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: globalColors.light,
    marginTop: 50,
  },
  containerForm: {
    marginBottom: 150,
  },
});

export default LoginScreen;
