import {API_BASE_URL} from '../../constants/spotifyBaseUrl';

export const chordGeneratorService = {
  async generateChords(title, artist) {
    try {
      console.log('Requesting chords for:', {title, artist});
      const response = await fetch(`${API_BASE_URL}/api/chords/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, artist}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received chord data:', data);
      return data;
    } catch (error) {
      console.error('Chord service error:', error);
      throw error;
    }
  },
};
