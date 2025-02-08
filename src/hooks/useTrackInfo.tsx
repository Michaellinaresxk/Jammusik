import {useState, useCallback} from 'react';
import spotifyConfig from '../infra/api/spotifyConfig';

export const useTrackInfo = () => {
  const [trackInfo, setTrackInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTrackInfo = useCallback(async (title, artist) => {
    setLoading(true);
    setError(null);
    try {
      // Agregamos logs para debugging
      console.log('Fetching track info for:', {title, artist});

      const data = await spotifyConfig.getTrackInfo(title, artist);

      // Verificamos que la información coincida
      if (data.track_info) {
        const isMatch =
          data.track_info.name.toLowerCase().includes(title.toLowerCase()) &&
          data.track_info.artist.toLowerCase().includes(artist.toLowerCase());

        if (!isMatch) {
          console.warn('Track info mismatch:', {
            requested: {title, artist},
            received: {
              title: data.track_info.name,
              artist: data.track_info.artist,
            },
          });
        }
      }

      setTrackInfo(data.track_info);
      return data.track_info;
    } catch (err) {
      console.error('Error fetching track info:', err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    trackInfo,
    loading,
    error,
    fetchTrackInfo,
  };
};
