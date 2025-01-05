import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
} from 'react-native';
import {globalColors, globalFormStyles} from '../../theme/Theme';
import {useSongDetailsService} from '../../../context/SongDetailsServiceContext';

interface BottomSheetsProps {
  onSelectKey: (key: string) => void;
  value?: string;
}

interface SongKey {
  id: string;
  key: string;
  order: number;
}

const BottomSheets: React.FC<BottomSheetsProps> = ({onSelectKey, value}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [keys, setKeys] = useState<SongKey[]>([]);
  const [loading, setLoading] = useState(true);

  const songDetailsService = useSongDetailsService();

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const fetchedKeys = await songDetailsService.getSongKeys();
        setKeys(fetchedKeys);
      } catch (error) {
        console.error('Error fetching keys:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKeys();
  }, [songDetailsService]);

  const handleKeySelection = (selectedKey: string) => {
    if (!selectedKey) {
      console.warn('No key selected');
      return;
    }

    onSelectKey(selectedKey);
    setModalVisible(false);
  };

  const renderKeyItem = ({item}: {item: SongKey}) => (
    <TouchableOpacity
      style={[styles.keyItem, value === item.key && styles.selectedKeyItem]}
      onPress={() => handleKeySelection(item.key)}>
      <Text
        style={[
          styles.keyItemText,
          value === item.key && styles.selectedKeyText,
        ]}>
        {item.key}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setModalVisible(true)}>
        <Text style={[styles.buttonText, value && styles.selectedButtonText]}>
          {value ? `Key: ${value}` : 'Select Key'}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose a Key</Text>

            {loading ? (
              <Text style={styles.loadingText}>Loading...</Text>
            ) : (
              <FlatList
                data={keys}
                keyExtractor={item => item.id}
                numColumns={4}
                renderItem={renderKeyItem}
              />
            )}

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  selectButton: {
    ...globalFormStyles.inputLogin,
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#838282',
    fontSize: 16,
  },
  selectedButtonText: {
    color: globalColors.primaryDark,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: globalColors.primary,
  },
  keyItem: {
    flex: 1,
    padding: 10,
    margin: 5,
    backgroundColor: globalColors.primaryAlt,
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedKeyItem: {
    backgroundColor: globalColors.primary,
  },
  keyItemText: {
    fontSize: 16,
    color: globalColors.primary,
  },
  selectedKeyText: {
    color: globalColors.light,
    fontWeight: '500',
  },
  loadingText: {
    textAlign: 'center',
    color: globalColors.primaryDark,
    padding: 20,
  },
  cancelButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: globalColors.primary,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: globalColors.light,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default BottomSheets;
