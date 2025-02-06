import {Platform} from 'react-native';
import {API_BASE_URL} from './spotifyBaseUrl';

const spotifyConfig = {
  getNewReleases: async () => {
    try {
      console.log('Running on:', Platform.OS);
      console.log('Fetching from:', `${API_BASE_URL}/browse/new-releases`);

      const response = await fetch(`${API_BASE_URL}/browse/new-releases`);

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
      console.log('New releases data received:', {
        count: data.length,
        sample: data[0]?.name,
      });
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
      console.error('Error fetching new releases:', error);
      throw error;
    }
  },

  getTrackInfo: async (title, artist) => {
    try {
      console.log('Fetching track info for:', {title, artist});

      const response = await fetch(
        `${API_BASE_URL}/browse/track-info?title=${encodeURIComponent(
          title,
        )}&artist=${encodeURIComponent(artist)}`,
      );

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
      console.log('Track info received:', data);
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
      console.error('Error fetching track info:', error);
      throw error;
    }
  },
};

export default spotifyConfig;
