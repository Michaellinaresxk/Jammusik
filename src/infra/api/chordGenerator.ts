import {Alert} from 'react-native';
import {API_BASE_URL} from '../../constants/spotifyBaseUrl';

export const chordGeneratorService = {
  async generateChords(title, artist) {
    try {
      const url = `${API_BASE_URL}/chords/generate`;
      console.log('Making request to:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          artist: artist.trim(),
        }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`,
        );
      }

      const data = await response.json();
      console.log('Successful response:', data);
      return data;
    } catch (error) {
      console.error('Service error:', error);
      Alert.alert('Service Error', error.message);
      throw error;
    }
  },
};
