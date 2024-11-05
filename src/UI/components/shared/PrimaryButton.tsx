import React from 'react';
import {Text, Pressable} from 'react-native';
import {globalStyles} from '../../theme/Theme';

interface Props {
  label: string;
  bgColor?: string;
  onPress: () => void;
  borderRadius?: number;
  colorText?: string;
  btnFontSize?: number;
  marginBottom?: number;
}

export const PrimaryButton = ({
  label,
  bgColor,
  onPress,
  borderRadius,
  colorText,
  btnFontSize,
  marginBottom,
}: Props) => {
  return (
    <Pressable
      style={({pressed}) => ({
        ...globalStyles.primaryButton,
        marginBottom: marginBottom,
        backgroundColor: bgColor,
        opacity: pressed ? 0.8 : 1,
        borderRadius: borderRadius ? borderRadius : 0,
        height: 60,
      })}
      onPress={() => onPress()}>
      <Text
        style={{
          color: colorText,
          fontSize: btnFontSize,
        }}>
        {label}
      </Text>
    </Pressable>
  );
};
