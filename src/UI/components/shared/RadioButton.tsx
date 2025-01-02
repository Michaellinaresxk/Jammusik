import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {globalColors} from '../../theme/Theme';

type RadioButtonProps = {
  options: {label: string; value: string}[];
  setSelectedSkill: (value: string) => void;
  selectedSkill: string;
};

const RadioButton = ({
  options,
  setSelectedSkill,
  selectedSkill,
}: RadioButtonProps) => {
  const [value, setValue] = useState(null);

  const handlePress = selectedValue => {
    setValue(selectedValue);
    setSelectedSkill(selectedValue);
  };

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionContainer}
          onPress={() => handlePress(option.value)}>
          <View
            style={[
              styles.circle,
              {borderColor: option.value === value ? '#18998B' : '#ccc'},
            ]}>
            {option.value === value && <View style={styles.checkedCircle} />}
          </View>
          <Text style={styles.label}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkedCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: globalColors.primary,
  },
  label: {
    fontSize: 16,
    color: globalColors.terceary,
  },
});

export default RadioButton;
