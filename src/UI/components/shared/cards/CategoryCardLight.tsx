import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalColors} from '../../../theme/Theme';

interface CategoryCardLightProps {
  title: string;
  onPress: () => void;
}

export const CategoryCardLight: React.FC<CategoryCardLightProps> = ({
  title,
  onPress,
}) => {
  const isLibrary = title.toLowerCase() === 'library';

  if (isLibrary) {
    return (
      <TouchableOpacity
        style={styles.libraryCard}
        onPress={onPress}
        activeOpacity={0.9}>
        <View style={styles.libraryIconContainer}>
          <Icon name="library" size={25} color={globalColors.light} />
        </View>

        <Text style={styles.libraryTitle}>{title}</Text>

        <Text style={styles.librarySubtitle}>All your songs in one place</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.regularCard}
      onPress={onPress}
      activeOpacity={0.9}>
      <Text style={styles.regularTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  libraryCard: {
    height: 145,
    width: 155,
    borderRadius: 16,
    padding: 16,
    backgroundColor: globalColors.primaryAlt,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  libraryIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 30,
    backgroundColor: globalColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  libraryTitle: {
    color: globalColors.primary,
    fontSize: 18,
    fontWeight: '300',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  librarySubtitle: {
    color: globalColors.terceary,
    fontSize: 12.5,
    marginTop: 4,
    textAlign: 'center',
  },
  regularCard: {
    height: 145,
    width: 150,
    borderRadius: 16,
    padding: 16,
    backgroundColor: globalColors.primaryAlt,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  regularTitle: {
    color: globalColors.primary,
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'center',
  },
});
