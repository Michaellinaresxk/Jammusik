import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
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
import {ForgotPasswordModal} from '../../components/shared/modals/ForgotPasswordModal';
// import {GoogleSigninButton} from '@react-native-google-signin/google-signin';

export const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isForgotPasswordVisible, setIsForgotPasswordVisible] = useState(false);

  const userService = useUserService();
  const navigation = useNavigation();
  const image = {
    uri: images?.loginBackground || '', // Validation to avoid undefined
  };

  const handleLogin = async ({email, password}) => {
    try {
      setIsLoading(true);
      setError('');

      if (!userService?.loginUser) {
        throw new Error('El servicio de usuario no está disponible.');
      }

      await userService.loginUser(email, password);
      navigation.navigate('HomeScreen');
    } catch (error) {
      const errorMessage =
        error?.code === 'auth/invalid-credential'
          ? 'Invalid credentials'
          : error?.message || 'An unexpected error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleLoginWithGoogle = async () => {
  //   try {
  //     setIsLoading(true);
  //     setError('');
  //     await userService.loginWithGoogle();
  //     navigation.navigate('HomeScreen');
  //   } catch (error) {
  //     setError('Failed to sign in with Google');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleForgotPassword = async (email: string) => {
    try {
      if (!userService) {
        throw new Error('User service is not available');
      }

      await userService.forgotPassword(email);

      // Quiet success for safety
      Alert.alert(
        'Check your email',
        'If the email is registered in our system, you will receive a link to reset your password. Please check your inbox or spam folder.',
        [
          {
            text: 'OK',
            onPress: () => {
              setIsForgotPasswordVisible(false);
            },
          },
        ],
      );
    } catch (error: any) {
      // Same message even if there is an error so as not to reveal if the email exists
      Alert.alert(
        'Check your email',
        'If the email is registered in our system, you will receive a link to reset your password. Please check your inbox or spam folder.',
      );
    } finally {
      // Make sure to close the modal in any case
      setIsForgotPasswordVisible(false);
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
                {/* <GoogleSigninButton
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={() => {
                    handleLoginWithGoogle();
                  }}
                  disabled={false}
                /> */}
                <View style={styles.containerLink}>
                  <Pressable
                    onPress={() => setIsForgotPasswordVisible(true)} // ✅ Open the modal
                    disabled={isLoading}>
                    {isLoading ? (
                      <ActivityIndicator
                        size="small"
                        color="#your-color-here"
                      />
                    ) : (
                      <Text style={styles.link}>Forgot Password?</Text>
                    )}
                  </Pressable>
                  {error ? <Text style={styles.errorText}>{error}</Text> : null}
                </View>
                <LinkLoginRegister
                  text="Not a member yet?"
                  link="Register"
                  goTo="RegisterScreen"
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
        <ForgotPasswordModal
          visible={isForgotPasswordVisible}
          onClose={() => setIsForgotPasswordVisible(false)}
          onSubmit={handleForgotPassword}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black', // This ensures no white flash when transitioning
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Adjust opacity as needed
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center', // Centers content vertically
    paddingHorizontal: 20,
  },
  containerLogo: {
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 60 : 40,
  },
  labelTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: globalColors.light,
    marginTop: 50,
  },
  containerForm: {
    width: '100%',
    marginTop: 30,
  },
  containerLink: {
    marginTop: 10,
    alignItems: 'center',
  },
  link: {
    color: globalColors.primary,
    fontSize: 18,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default LoginScreen;
