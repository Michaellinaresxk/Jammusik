import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {globalColors} from '../../theme/Theme';

type LinkText = {
  text: string;
  link: string;
  goTo: never;
};

export const LinkLoginRegister = ({text, link, goTo}: LinkText) => {
  const navigation = useNavigation();
  return (
    <View style={styles.containerLink}>
      <Text style={styles.text}>{text}</Text>
      <Pressable onPress={() => navigation.navigate(goTo)}>
        <Text style={styles.link}>{link}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  link: {
    fontWeight: 'bold',
    fontSize: 18,
    color: globalColors.primary,
  },
  containerLink: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    gap: 5,
    justifyContent: 'center',
  },
  text: {
    color: globalColors.light,
  },
});
