import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {globalColors} from '../../../theme/Theme';
// import {SharePlaylistModalProps} from '../../../../types/songTypes';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

// SharePlaylistModal.tsx
export const SharePlaylistModal = ({visible, onClose, playlistId}) => {
  const [email, setEmail] = useState('');

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}>
        <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
          <View style={styles.handle} />

          <Text style={styles.title}>Share with</Text>

          <View style={styles.inputContainer}>
            <Icon name="mail" size={25} color={globalColors.primary} />
            <TextInput
              style={styles.input}
              placeholder="Enter email address"
              placeholderTextColor={globalColors.terceary}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareText}>Share</Text>
            <Icon name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 12,
    fontSize: 16,
    color: globalColors.primaryDark,
  },
  shareButton: {
    backgroundColor: globalColors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  shareText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 12,
    height: '50%', // Add this
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 30, // Increased spacing
  },
  title: {
    fontSize: 28, // Larger font
    fontWeight: '600',
    color: globalColors.primaryDark,
    marginBottom: 40, // More spacing
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: globalColors.light,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 40, // More spacing
    borderWidth: 1,
    borderColor: globalColors.secondary + '20',
    height: 60, // Taller input
  },
});
