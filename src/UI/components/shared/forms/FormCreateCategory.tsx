import React, {useState} from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  View,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import {globalColors, globalFormStyles} from '../../../theme/Theme';
import {PrimaryButton} from '../PrimaryButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {SliderQuotes} from '../SliderQuotes';

export const FormCreateCategory = ({
  initialTitle = '',
  onCreateCategory,
  isLoading,
  isEditing = false,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [labelAnim] = useState(new Animated.Value(title ? 1 : 0));

  const animateLabel = toValue => {
    Animated.timing(labelAnim, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleFocus = () => {
    setIsFocused(true);
    animateLabel(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!title) {
      animateLabel(0);
    }
  };

  const validateForm = () => {
    if (!title.trim()) {
      setError('The title is required');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onCreateCategory({title});
    }
  };

  const labelStyle = {
    position: 'absolute',
    left: 16,
    top: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, -12],
    }),
    fontSize: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [globalColors.terceary, globalColors.primary],
    }),
    backgroundColor: isFocused ? '#fff' : 'transparent',
    paddingHorizontal: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 8],
    }),
  };

  return (
    <View style={globalFormStyles.containerForm}>
      <View style={globalFormStyles.form}>
        <View style={styles.inputContainer}>
          <Animated.Text style={[styles.label, labelStyle]}>
            Category Title
          </Animated.Text>
          <TextInput
            style={[
              styles.input,
              isFocused && styles.inputFocused,
              error && styles.inputError,
            ]}
            value={title}
            autoCorrect={false}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={text => {
              setTitle(text);
              setError('');
            }}
          />
          {title.length > 0 && (
            <Icon
              name="checkmark-circle"
              size={24}
              color={globalColors.primary}
              style={styles.icon}
            />
          )}
          {error ? (
            <View style={styles.errorContainer}>
              <Icon name="alert-circle" size={16} color="red" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}
        </View>

        <PrimaryButton
          label={
            !isLoading ? (
              isEditing ? (
                'Update Category'
              ) : (
                'Create Category'
              )
            ) : (
              <ActivityIndicator size="large" />
            )
          }
          bgColor={globalColors.primary}
          borderRadius={8}
          colorText={globalColors.light}
          btnFontSize={20}
          onPress={handleSubmit}
          disabled={isLoading}
        />
      </View>
      <SliderQuotes />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 24,
    position: 'relative',
  },
  input: {
    height: 56,
    borderWidth: 0.5,
    borderColor: globalColors.terceary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 8,
    fontSize: 16,
    backgroundColor: '#fff',
    color: globalColors.primaryDark,
    ...Platform.select({
      ios: {
        shadowColor: globalColors.terceary,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  inputFocused: {
    borderColor: globalColors.primary,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowOpacity: 0.1,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  inputError: {
    borderColor: 'red',
  },
  label: {
    position: 'absolute',
    fontSize: 12,
    fontWeight: '500',
    zIndex: 1,
  },
  icon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 4,
  },
});
