import React, {useState} from 'react';
import {
  View,
  TextInput,
  ActivityIndicator,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import {PrimaryButton} from '../PrimaryButton';
import {globalColors, globalFormStyles} from '../../../theme/Theme';
import Icon from 'react-native-vector-icons/Ionicons';

export const FormRegister = ({
  onRegister,
  isLoading,
  error,
  setError,
  showPassword,
  toggleShowPassword,
}) => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    userName: '',
    password: '',
  });

  const validateForm = () => {
    const newErrors = {
      email: '',
      userName: '',
      password: '',
    };
    let isValid = true;

    // Email validation
    if (!email) {
      newErrors.email = 'The email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'The email is not valid';
      isValid = false;
    }

    // UserName validation
    if (!userName) {
      newErrors.userName = 'The userName is required';
      isValid = false;
    } else if (userName.length < 4) {
      newErrors.userName = 'The userName is not less than 4 words';
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = 'The password is required';
      isValid = false;
    } else if (password.length < 4) {
      newErrors.password = 'Password have it more than 4 words';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onRegister({email, userName, password});
    }
  };

  return (
    <View style={globalFormStyles.containerForm}>
      <View style={globalFormStyles.form}>
        <View>
          <TextInput
            style={[
              globalFormStyles.inputLogin,
              errors.email && styles.inputError,
            ]}
            placeholderTextColor="#838282"
            keyboardType="email-address"
            placeholder="Email"
            value={email}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={text => {
              setEmail(text);
              setErrors(prev => ({...prev, email: ''}));
              setError('');
            }}
          />
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}

          <TextInput
            style={[
              globalFormStyles.inputLogin,
              errors.userName && styles.inputError,
            ]}
            placeholderTextColor="#838282"
            placeholder="Username"
            value={userName}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={text => {
              setUserName(text);
              setErrors(prev => ({...prev, userName: ''}));
            }}
          />
          {errors.userName ? (
            <Text style={styles.errorText}>{errors.userName}</Text>
          ) : null}

          <View style={styles.passwordContainer}>
            <TextInput
              style={[
                globalFormStyles.inputLogin,
                errors.password && styles.inputError,
              ]}
              placeholder="Password"
              autoCorrect={false}
              autoCapitalize="none"
              value={password}
              secureTextEntry={!showPassword}
              placeholderTextColor="#838282"
              onChangeText={text => {
                setPassword(text);
                setErrors(prev => ({...prev, password: ''}));
              }}
            />
            <Pressable
              style={styles.eyeIconContainer}
              onPress={toggleShowPassword}>
              <Icon
                name={showPassword ? 'eye' : 'eye-off'}
                size={24}
                color="gray"
              />
            </Pressable>
          </View>
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}
        </View>

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorMessage}>{error}</Text>
          </View>
        ) : null}

        <View style={styles.buttonContainer}>
          <PrimaryButton
            label={isLoading ? <ActivityIndicator size="large" /> : 'SIGN UP'}
            bgColor={globalColors.primary}
            borderRadius={5}
            colorText={globalColors.secondary}
            btnFontSize={20}
            onPress={handleSubmit}
            disabled={isLoading}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  inputError: {
    borderColor: 'red',
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
    bottom: 37,
  },
  errorContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: globalColors.danger,
  },
  errorMessage: {
    color: globalColors.light,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
});
