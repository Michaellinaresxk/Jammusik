// hooks/useRelatedTracks.js
import {useState, useCallback} from 'react';
import spotifyConfig from '../infra/api/spotifyConfig';

export const useRelatedTracks = () => {
  const [relatedTracks, setRelatedTracks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRelatedTracks = useCallback(async (title, artist) => {
    setLoading(true);
    setError(null);
    try {
      const data = await spotifyConfig.getRelatedTracks(title, artist);
      setRelatedTracks(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    relatedTracks,
    loading,
    error,
    fetchRelatedTracks,
  };
};
