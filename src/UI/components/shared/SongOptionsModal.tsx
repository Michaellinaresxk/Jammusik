import React from 'react';
import { View, TouchableOpacity, Modal, StyleSheet, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalColors } from '../../theme/Theme';

type SongOptionsModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onShare: () => void;
  onAddToPlaylist: () => void;
  songId: string;
};

export const SongOptionsModal = ({
  isVisible,
  onClose,
  onEdit,
  onShare,
  onAddToPlaylist,
  songId
}: SongOptionsModalProps) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.option} onPress={onEdit}>
            <Icon name="create-outline" size={24} color={globalColors.primary} />
            <Text style={styles.optionText}>Edit Song</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={onShare}>
            <Icon name="share-social-outline" size={24} color={globalColors.primary} />
            <Text style={styles.optionText}>Share Song</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={onAddToPlaylist}>
            <Icon name="list-outline" size={24} color={globalColors.primary} />
            <Text style={styles.optionText}>Add to Playlist</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    elevation: 5,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    marginLeft: 15,
    fontSize: 16,
    color: globalColors.primaryDark,
  },
  actionIcon: {
    color: globalColors.light,
  },
});
