import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {globalColors} from '../../theme/Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

interface Props {
  name: string;
  icon: string;
  component: string;

  isFirst: boolean;
  isLast: boolean;
  isOnly?: boolean;
}
export const MenuItem = ({
  name,
  icon,
  component,
  isFirst = false,
  isLast = false,
  isOnly = false,
}: Props) => {
  const navigation = useNavigation<any>();

  return (
    <Pressable onPress={() => navigation.navigate(component)}>
      <View
        style={{
          ...styles.container,
          ...(isFirst && {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            paddingTop: 10,
          }),
          ...(isLast && {
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            paddingTop: 10,
          }),

          ...(isOnly && {
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }),
        }}>
        <Icon name={icon} color={globalColors.primary} size={25} />
        <Text
          style={{
            marginLeft: 10,
            fontSize: 17,
            color: globalColors.terceary,
          }}>
          {name}
        </Text>
        <Icon
          name="chevron-forward-outline"
          color={globalColors.primary}
          style={{marginLeft: 'auto'}}
          size={25}
        />
      </View>
      {isFirst && !isOnly && (
        <View
          style={{
            height: 0.3,
            width: '100%',
            backgroundColor: globalColors.primaryAlt,
            alignSelf: 'center',
          }}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'white',
  },
});
