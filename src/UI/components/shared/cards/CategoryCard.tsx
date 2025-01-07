import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalColors} from '../../../theme/Theme';
import type {CategoryView} from '../../../../views/CategoryView';

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
  onEdit,
}) => {
  const {id, title} = category;
  const isLibrary = title.toLowerCase() === 'library';

  const deleteConfirmation = () =>
    Alert.alert(
      'Delete Category',
      `Are you sure you want to delete "${title}"?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete?.(id),
        },
      ],
    );

  const editConfirmation = () =>
    Alert.alert('Edit Category', `Do you want to edit "${title}"?`, [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Edit',
        style: 'default',
        onPress: () => onEdit?.(category),
      },
    ]);

  if (isLibrary) {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.9}>
        <View style={styles.libraryCard}>
          <View style={styles.decorativeShape} />

          <View style={styles.libraryIconContainer}>
            <Icon name="library" size={32} color={globalColors.light} />
          </View>

          <Text style={styles.libraryTitle}>{title}</Text>

          <Text style={styles.librarySubtitle}>
            All your songs in one place
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}>
      <View style={styles.regularCard}>
        <View style={styles.titleContainer}>
          <Text style={styles.regularTitle} numberOfLines={2}>
            {title}
          </Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={e => {
              e.stopPropagation();
              editConfirmation();
            }}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Icon name="create" size={20} color={globalColors.light} />
          </TouchableOpacity>

          <View style={styles.actionDivider} />

          <TouchableOpacity
            style={styles.actionButton}
            onPress={e => {
              e.stopPropagation();
              deleteConfirmation();
            }}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Icon name="trash" size={19} color={globalColors.light} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  // Estilos para Library Card
  libraryCard: {
    height: 160,
    width: 160,
    borderRadius: 16,
    padding: 16,
    backgroundColor: globalColors.primary,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  decorativeShape: {
    position: 'absolute',
    right: -20,
    top: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: [{scale: 1.2}],
  },
  libraryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  libraryTitle: {
    color: globalColors.light,
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  librarySubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  // Estilos para Regular Cards
  regularCard: {
    height: 160,
    width: 160,
    borderRadius: 16,
    backgroundColor: globalColors.primary,
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 40,
  },
  regularTitle: {
    color: globalColors.light,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    margin: 12,
    padding: 4,
  },
  actionButton: {
    padding: 8,
    borderRadius: 16,
  },
  actionDivider: {
    width: 1,
    height: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginHorizontal: 4,
  },
});
