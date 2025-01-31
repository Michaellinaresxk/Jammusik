import React, {useState} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {globalColors} from '../../theme/Theme';

const ThemeSwitch = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setIsActive(!isActive)}
      style={[
        styles.switchContainer,
        {
          backgroundColor: isActive
            ? globalColors.secondary
            : globalColors.primaryAlt,
        },
      ]}
      activeOpacity={0.8}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: isActive
              ? globalColors.secondary
              : globalColors.primary,
            transform: [{translateX: isActive ? 32 : 0}],
          },
        ]}>
        <Ionicons
          name={isActive ? 'moon' : 'sunny'}
          size={18}
          color={isActive ? globalColors.primary : globalColors.primaryAlt}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: 64,
    height: 32,
    borderRadius: 16,
    padding: 4,
    justifyContent: 'center',
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 4,
  },
});

export default ThemeSwitch;
