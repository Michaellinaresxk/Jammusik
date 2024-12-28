// hooks/useCreateSong.tsx
import React, {useState} from 'react'; // Añadimos React
import {Modal, ScrollView, Text, View, StyleSheet} from 'react-native';
import {KeyboardGestureArea} from 'react-native-keyboard-controller';
import {useSongService} from '../context/SongServiceContext';
import Toast from 'react-native-toast-message';
import {PrimaryButton} from '../UI/components/shared/PrimaryButton';
import {globalColors} from '../UI/theme/Theme';
import {FormCreateSong} from '../UI/components/shared/forms/FormCreateSong';

interface CreateSongValues {
  title: string;
  artist: string;
  categoryId: string;
}

interface UseCreateSongProps {
  onSuccess?: () => void;
}

export const useCreateSong = ({onSuccess}: UseCreateSongProps = {}) => {
  const songService = useSongService();
  const [isSongModalVisible, setIsSongModalVisible] = useState(false);
  const [isLoadingNewSong, setIsLoadingNewSong] = useState(false);

  const handleCreateSong = async (values: CreateSongValues) => {
    try {
      setIsLoadingNewSong(true);
      await songService.createSong(
        values.categoryId,
        values.title,
        values.artist,
        false,
      );

      Toast.show({
        type: 'success',
        text1: 'Song created successfully!',
      });

      setIsSongModalVisible(false);
      onSuccess?.();
    } catch (error) {
      console.error('Error creating song:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to create song',
      });
    } finally {
      setIsLoadingNewSong(false);
    }
  };

  // We move the component out of the return
  const CreateSongModal: React.FC = () => {
    return (
      <Modal
        visible={isSongModalVisible}
        animationType="slide"
        presentationStyle="formSheet">
        <KeyboardGestureArea interpolator="ios" style={{flex: 1}}>
          <ScrollView horizontal={false} style={{flex: 1}}>
            <View style={styles.modalBtnContainer}>
              <Text style={styles.modalFormHeaderTitle}>Create New Song</Text>
              <PrimaryButton
                label="Close"
                btnFontSize={20}
                colorText={globalColors.light}
                onPress={() => setIsSongModalVisible(false)}
              />
            </View>

            <FormCreateSong
              onSubmit={handleCreateSong}
              isLoading={isLoadingNewSong}
              isEditing={false}
            />
          </ScrollView>
        </KeyboardGestureArea>
      </Modal>
    );
  };

  return {
    CreateSongModal,
    openCreateSongModal: () => setIsSongModalVisible(true),
    closeCreateSongModal: () => setIsSongModalVisible(false),
    isLoading: isLoadingNewSong,
    isSongModalVisible, // We also export this status in case it is necessary.
  };
};

const styles = StyleSheet.create({
  modalBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: globalColors.primary,
    paddingLeft: 35,
    paddingRight: 25,
  },
  modalFormHeaderTitle: {
    fontSize: 20,
    color: globalColors.light,
  },
});
