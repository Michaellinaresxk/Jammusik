import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalColors} from '../../../theme/Theme';

export const CategoryInput = ({value, onChange, onSubmit}) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      placeholder="Type a new category name"
      placeholderTextColor="#838282"
      value={value}
      onChangeText={onChange}
      onSubmitEditing={onSubmit}
      returnKeyType="done"
      autoCapitalize="words"
    />
    {value.trim() && (
      <TouchableOpacity onPress={onSubmit} style={styles.iconContainer}>
        <Icon name="checkmark-circle" size={24} color={globalColors.primary} />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  iconContainer: {
    paddingRight: 10,
  },
});
