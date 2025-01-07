import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalColors} from '../../theme/Theme';

export const FeaturedCategories = ({categories}) => {
  return (
    <View style={styles.featuredContainer}>
      <Text style={styles.featuredTitle}>Featured Categories</Text>
      <View style={styles.categoriesGrid}>
        {categories.map((category, index) => (
          <View key={index} style={styles.featuredCard}>
            <Icon name={category.icon} size={24} color={globalColors.primary} />
            <Text style={styles.categoryName}>{category.name}</Text>
            <Text style={styles.songCount}>{category.songCount} songs</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  featuredContainer: {
    padding: 16,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: globalColors.primaryDark,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featuredCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
    color: globalColors.primaryDark,
  },
  songCount: {
    fontSize: 12,
    color: globalColors.terceary,
    marginTop: 4,
  },
});
