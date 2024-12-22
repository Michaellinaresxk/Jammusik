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
  onRemoveSong: () => void;
  onDelete?: () => void;
  songId: string;
  variant?: 'library' | 'playlist';
  onToggleFavorite: () => void;
};

export const SongOptionsModal = ({
  isVisible,
  onClose,
  onEdit,
  onShare,
  onAddToPlaylist,
  onRemoveSong,
  onDelete,
  songId,
  onToggleFavorite,
  variant = 'library'
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
          {variant === 'library' ? (
            <>
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

              <TouchableOpacity
                style={[styles.option, styles.deleteOption]}
                onPress={onDelete}
              >
                <Icon name="trash-outline" size={24} color={globalColors.danger} />
                <Text style={[styles.optionText, styles.deleteText]}>Delete from Library</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View>
              <TouchableOpacity
                style={styles.option}
                onPress={onAddToPlaylist}
              >
              <Icon name="list-outline" size={24} color={globalColors.primary} />
              <Text style={styles.optionText}>Add to Playlist</Text>
              </TouchableOpacity>
              <TouchableOpacity
                 style={[styles.option, styles.deleteOption]}
                onPress={onRemoveSong}
              >
                <Icon name="remove-circle-outline" size={24} color={globalColors.danger} />
                <Text style={[styles.optionText, styles.deleteText]}>Remove from Playlist</Text>
              </TouchableOpacity>
            </View>
          )}
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
  deleteOption: {
    borderBottomWidth: 0,
  },
  deleteText: {
    color: globalColors.danger,
  },
});
