import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {globalColors} from '../../../theme/Theme';
import Toast from 'react-native-toast-message';
import {auth} from '../../../../infra/api/firebaseConfig';

interface Category {
  id: string;
  name: string;
}

interface FinalSongStepProps {
  selectedGenres: Category[];
  navigation: any;
  songService: any;
  onComplete: () => void;
}

const FinalSongStep = ({
  selectedGenres = [],
  navigation,
  songService,
  onComplete,
}: FinalSongStepProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [songForm, setSongForm] = useState({title: '', artist: ''});
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const handleCreateSong = async () => {
    if (!selectedCategory) {
      Toast.show({
        type: 'error',
        text1: 'Please select a category',
      });
      return;
    }

    if (!songForm.title || !songForm.artist) {
      Toast.show({
        type: 'error',
        text1: 'Both Title and Artist fields are required',
      });
      return;
    }

    setIsLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not logged in');

      console.log('FinalSongStep - Creating song with data:', {
        categoryId: selectedCategory.id,
        title: songForm.title,
        artist: songForm.artist,
        isDone: false,
      });

      await songService.createSong(
        selectedCategory.id,
        songForm.title,
        songForm.artist,
        false,
      );

      Toast.show({
        type: 'success',
        text1: 'Song created successfully!',
        text2: 'You can find it in Library and in your selected category',
      });

      onComplete();
      navigation.navigate('CategorySelected', {id: selectedCategory.id});
    } catch (error) {
      console.error('Error creating song:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to create song',
        text2: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Category Selection */}
        <Text style={styles.sectionTitle}>
          Select a category for your song:
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}>
          {selectedGenres.map(genre => (
            <TouchableOpacity
              key={genre.id}
              style={[
                styles.categoryChip,
                selectedCategory?.id === genre.id && styles.selectedChip,
              ]}
              onPress={() => setSelectedCategory(genre)}>
              <Text style={styles.categoryText}>{genre.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Song Form */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Song Title</Text>
            <TextInput
              style={styles.input}
              value={songForm.title}
              onChangeText={text =>
                setSongForm(prev => ({...prev, title: text}))
              }
              placeholder="Enter song title"
              placeholderTextColor={globalColors.terceary}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Artist</Text>
            <TextInput
              style={styles.input}
              value={songForm.artist}
              onChangeText={text =>
                setSongForm(prev => ({...prev, artist: text}))
              }
              placeholder="Enter artist name"
              placeholderTextColor={globalColors.terceary}
            />
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.skipButton]}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.skipButtonText}>Skip for now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.createButton,
              (!songForm.title || !songForm.artist || !selectedCategory) &&
                styles.disabledButton,
            ]}
            onPress={handleCreateSong}
            disabled={
              !songForm.title ||
              !songForm.artist ||
              !selectedCategory ||
              isLoading
            }>
            {isLoading ? (
              <ActivityIndicator color={globalColors.light} />
            ) : (
              <Text style={styles.createButtonText}>Create Song</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.secondary,
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: globalColors.light,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: globalColors.terceary,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    color: globalColors.light,
    marginBottom: 12,
  },
  categoriesScroll: {
    marginBottom: 24,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: globalColors.primaryDark,
    marginRight: 8,
    borderWidth: 1,
    borderColor: globalColors.primary,
  },
  selectedChip: {
    backgroundColor: globalColors.primary,
  },
  categoryText: {
    color: globalColors.light,
    fontSize: 16,
  },
  form: {
    marginTop: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: globalColors.light,
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    backgroundColor: globalColors.primaryDark,
    borderRadius: 8,
    padding: 12,
    color: globalColors.light,
    borderWidth: 1,
    borderColor: globalColors.primary,
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  skipButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: globalColors.terceary,
  },
  createButton: {
    backgroundColor: globalColors.primary,
  },
  disabledButton: {
    opacity: 0.5,
  },
  skipButtonText: {
    color: globalColors.terceary,
    fontSize: 16,
  },
  createButtonText: {
    color: globalColors.light,
    fontSize: 16,
    fontWeight: 'bold',
  },
  tipContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: globalColors.primaryDark,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: globalColors.primary,
  },
  tipText: {
    color: globalColors.terceary,
    fontSize: 14,
  },
  infoContainer: {
    backgroundColor: globalColors.primaryDark,
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  infoText: {
    color: globalColors.light,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoDetail: {
    color: globalColors.terceary,
    fontSize: 14,
    marginLeft: 8,
    marginBottom: 4,
  },
});

export default FinalSongStep;
