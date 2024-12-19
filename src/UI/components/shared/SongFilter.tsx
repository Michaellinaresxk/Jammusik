import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalColors} from '../../theme/Theme';

interface SongFilterProps {
  onSearchChange: (text: string) => void;
  onFilterByKey: (key: string | null) => void;
  searchText: string;
  selectedKey: string | null;
  availableKeys: string[];
}

export const SongFilter: React.FC<SongFilterProps> = ({
  onSearchChange,
  onFilterByKey,
  searchText,
  selectedKey,
  availableKeys,
}) => {
  const [showKeyModal, setShowKeyModal] = React.useState(false);

  return (
    <View style={styles.container}>
      {/* Search by name */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={30} color={globalColors.terceary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Title..."
          value={searchText}
          onChangeText={onSearchChange}
          placeholderTextColor={globalColors.terceary}
        />
        {searchText ? (
          <TouchableOpacity onPress={() => onSearchChange('')}>
            <Icon name="close-circle" size={22} color={globalColors.terceary} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Search by Key */}
      <View style={styles.keyFilterContainer}>
        <TouchableOpacity
          style={styles.keyButton}
          onPress={() => setShowKeyModal(true)}>
          <Icon name="musical-note" size={20} color={globalColors.primary} />
          <Text style={styles.keyButtonText}>
            {selectedKey || 'Filter by Key'}
          </Text>
          {selectedKey && (
            <TouchableOpacity
              onPress={e => {
                e.stopPropagation();
                onFilterByKey(null);
              }}
              style={styles.clearKeyButton}>
              <Icon
                name="close-circle"
                size={18}
                color={globalColors.terceary}
              />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>

      {/* Key selection modal */}
      <Modal
        visible={showKeyModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowKeyModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Key</Text>
            <FlatList
              data={availableKeys}
              numColumns={4}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.keyItem,
                    selectedKey === item && styles.selectedKeyItem,
                  ]}
                  onPress={() => {
                    onFilterByKey(item);
                    setShowKeyModal(false);
                  }}>
                  <Text
                    style={[
                      styles.keyItemText,
                      selectedKey === item && styles.selectedKeyItemText,
                    ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowKeyModal(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 30,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: globalColors.light,
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: globalColors.primaryAlt,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 20,
  },
  keyFilterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  keyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: globalColors.primaryAlt,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  keyButtonText: {
    color: globalColors.primary,
    fontSize: 14,
  },
  clearKeyButton: {
    marginLeft: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: globalColors.light,
    borderRadius: 12,
    padding: 16,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: globalColors.primary,
    textAlign: 'center',
    marginBottom: 16,
  },
  keyItem: {
    flex: 1,
    margin: 4,
    padding: 10,
    backgroundColor: globalColors.primaryAlt,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedKeyItem: {
    backgroundColor: globalColors.primary,
  },
  keyItemText: {
    color: globalColors.primary,
    fontSize: 14,
  },
  selectedKeyItemText: {
    color: globalColors.light,
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: globalColors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: globalColors.light,
    fontSize: 16,
    fontWeight: '500',
  },
});
