import {globalColors, globalFormStyles} from '../../theme/Theme';

import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
} from 'react-native';

const MUSIC_KEYS = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
];

interface BottomSheetsProps {
  onSelectKey: (key: string) => void;
  value: string;
}

const BottomSheets: React.FC<BottomSheetsProps> = ({onSelectKey, value}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleKeySelection = (key: string) => {
    onSelectKey(key);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>
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
            <FlatList
              data={MUSIC_KEYS}
              keyExtractor={item => item}
              numColumns={4}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.keyItem}
                  onPress={() => handleKeySelection(item)}>
                  <Text style={styles.keyItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
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
  },
  buttonText: {
    color: '#838282',
    fontSize: 18,
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
  keyItemText: {
    fontSize: 16,
    color: globalColors.primary,
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
    fontWeight: 'light',
    fontSize: 20,
  },
});

export default BottomSheets;
