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
      const data = await spotifyConfig.getTrackInfo(title, artist);
      // Asegúrate de que estás guardando toda la información que necesitas
      setTrackInfo(data.track_info);
      return data.track_info;
    } catch (err) {
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
