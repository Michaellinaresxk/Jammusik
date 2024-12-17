// components/shared/cards/CategoryCard.tsx
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { globalColors } from '../../../theme/Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import type { CategoryView } from '../../../../views/CategoryView';

interface CategoryCardProps {
  category: CategoryView;
  onPress: () => void;
  onEdit?: (category: CategoryView) => void;
  onDelete?: (categoryId: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category,
  onPress, 
  onDelete, 
  onEdit 
}) => {
  const { id, title } = category;

  const deleteConfirmation = () =>
    Alert.alert(
      'Delete Category',
      `Are you sure you want to delete "${title}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete?.(id)
        }
      ]
    );

  const editConfirmation = () =>
    Alert.alert(
      'Edit Category',
      `Do you want to edit "${title}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Edit',
          style: 'destructive',
          onPress: () => onEdit?.(category)
        }
      ]
    );

  return (
    <TouchableOpacity 
      style={styles.categoryCard} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.categoryCardText} numberOfLines={2}>
        {title}
      </Text>
      
      {title.toLowerCase() !== 'all' && (
        <View style={styles.containerIcons}>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              editConfirmation();
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon
              name="pencil-sharp"
              color={globalColors.light}
              size={20}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              deleteConfirmation();
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon
              name="trash-sharp"
              color={globalColors.light}
              size={20}
            />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    backgroundColor: globalColors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 135,
    width: 150,
    margin: 10,
    padding: 10,
  },
  categoryCardText: {
    color: globalColors.light,
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'center',
  },
  containerIcons: {
    padding: 10,
    gap: 15,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});