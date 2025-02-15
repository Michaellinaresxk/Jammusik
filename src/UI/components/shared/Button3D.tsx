import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  Platform,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'dark';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

export const Button3D: React.FC<Props> = ({
  label,
  onPress,
  variant = 'primary',
  style,
  textStyle,
  disabled = false,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: '#c7c3c0',
          shadowColor: '#ffffff',
          textColor: '#5f5f5f',
          pressedShadow: '#000000',
        };
      case 'danger':
        return {
          backgroundColor: '#d42a02',
          shadowColor: '#fb702c',
          textColor: '#ffffff',
          pressedShadow: '#000000',
        };
      case 'dark':
        return {
          backgroundColor: '#545251',
          shadowColor: '#a8a6a4',
          textColor: '#ffffff',
          pressedShadow: '#000000',
        };
      default:
        return {
          backgroundColor: '#c7c3c0',
          shadowColor: '#ffffff',
          textColor: '#5f5f5f',
          pressedShadow: '#000000',
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.button,
        {
          backgroundColor: variantStyles.backgroundColor,
          // Platform-specific shadow styles
          ...Platform.select({
            ios: {
              shadowColor: pressed
                ? variantStyles.pressedShadow
                : variantStyles.shadowColor,
              shadowOffset: pressed
                ? {width: 0, height: 1}
                : {width: 1.5, height: 1.5},
              shadowOpacity: pressed ? 0.3 : 0.4,
              shadowRadius: pressed ? 2 : 3,
            },
            android: {
              elevation: pressed ? 2 : 8,
            },
          }),
          transform: [
            {scale: pressed ? 0.98 : 1},
            {translateY: pressed ? 1 : 0},
          ],
        },
        style,
      ]}>
      <Text
        style={[
          styles.text,
          {
            color: variantStyles.textColor,
          },
          textStyle,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 90,
    height: 90,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c7c3c0',
  },
  text: {
    fontSize: 14,
    letterSpacing: 0.75,
    fontFamily: Platform.select({
      ios: 'Montserrat',
      android: 'Montserrat-Regular',
    }),
  },
});
