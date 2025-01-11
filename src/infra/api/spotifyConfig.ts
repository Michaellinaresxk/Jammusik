import {Platform} from 'react-native';
import {API_BASE_URL} from './spotifyBaseUrl';

const spotifyConfig = {
  getTopTracks: async () => {
    try {
      console.log('Running on:', Platform.OS);
      console.log('Fetching from:', `${API_BASE_URL}/tracks/top`);

      const response = await fetch(`${API_BASE_URL}/tracks/top`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText,
        });
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (
        error instanceof TypeError &&
        error.message === 'Network request failed'
      ) {
        console.error(
          'Network error - Check if:',
          '\n1. Your backend server is running',
          '\n2. The IP address/port is correct',
          '\n3. You can access the API in browser/postman',
        );
      }
      throw error;
    }
  },

  getTrackDetails: async (trackId: string) => {
    try {
      console.log('Requesting track details for:', trackId);
      const response = await fetch(`${API_BASE_URL}/tracks/${trackId}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Track details response:', data);
      return data;
    } catch (error) {
      console.error('Error fetching track details:', error);
      throw error;
    }
  },

  analyzeTrack: async (title: string, artist: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/tracks/analyze?title=${encodeURIComponent(
          title,
        )}&artist=${encodeURIComponent(artist)}`,
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Analysis error:', errorData);
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('Error analyzing track:', error);
      return null;
    }
  },
};

export default spotifyConfig;
