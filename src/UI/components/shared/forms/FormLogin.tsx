import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from 'react-native';
import {PrimaryButton} from '../PrimaryButton';
import {globalColors, globalFormStyles} from '../../../theme/Theme';
import Icon from 'react-native-vector-icons/Ionicons';

export const FormLogin = ({
  onLogin,
  isLoading,
  error,
  setError,
  showPassword,
  toggleShowPassword,
}) => {
  const [formData, setFormData] = useState({email: '', password: ''});
  const [formErrors, setFormErrors] = useState({email: '', password: ''});

  const validateForm = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({...prev, [field]: value}));
    setFormErrors(prev => ({...prev, [field]: ''}));
    setError('');
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onLogin(formData);
    }
  };

  return (
    <View style={globalFormStyles.containerForm}>
      <View style={globalFormStyles.form}>
        {/* Email Input */}
        <TextInput
          style={[
            globalFormStyles.inputLogin,
            formErrors.email && styles.inputError,
          ]}
          placeholder="Email"
          placeholderTextColor="#838282"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={formData.email}
          onChangeText={text => handleChange('email', text)}
        />
        {formErrors.email && (
          <Text style={styles.errorText}>{formErrors.email}</Text>
        )}

        {/* Password Input */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[
              globalFormStyles.inputLogin,
              formErrors.password && styles.inputError,
            ]}
            placeholder="Password"
            placeholderTextColor="#838282"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            value={formData.password}
            onChangeText={text => handleChange('password', text)}
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
        {formErrors.password && (
          <Text style={styles.errorText}>{formErrors.password}</Text>
        )}

        {/* General Error */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorMessage}>{error}</Text>
          </View>
        )}

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            label={isLoading ? <ActivityIndicator size="large" /> : 'SIGN IN'}
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
    marginTop: 16,
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{translateY: -12}],
    padding: 4,
  },
  errorContainer: {
    marginTop: 16,
    padding: 10,
    backgroundColor: globalColors.danger,
    borderRadius: 5,
  },
  errorMessage: {
    color: globalColors.light,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 24,
  },
});

export default FormLogin;
