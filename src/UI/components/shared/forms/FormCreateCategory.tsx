import React, {useState} from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import {globalColors, globalFormStyles} from '../../../theme/Theme';
import {PrimaryButton} from '../PrimaryButton';

export const FormCreateCategory = ({
  initialTitle = '',
  onCreateCategory,
  isLoading,
  isEditing = false,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [error, setError] = useState('');

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

  return (
    <View style={globalFormStyles.containerForm}>
      <View style={globalFormStyles.form}>
        <View>
          <TextInput
            style={[globalFormStyles.inputLogin, error && styles.inputError]}
            placeholderTextColor="#838282"
            placeholder="Title..."
            value={title}
            autoCorrect={false}
            onChangeText={text => {
              setTitle(text);
              setError('');
            }}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
          borderRadius={5}
          colorText={globalColors.light}
          btnFontSize={20}
          onPress={handleSubmit}
          disabled={isLoading}
        />
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
});
