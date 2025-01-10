import {useState, useEffect} from 'react';
import type {Track} from '../types/tracksTypes';
import spotifyConfig from '../infra/api/spotifyConfig';

export const useTopTracks = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopTracks = async () => {
    try {
      setIsLoading(true);
      const data = await spotifyConfig.getTopTracks();
      setTracks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch top tracks');
      console.error('Error fetching top tracks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopTracks();
  }, []);

  return {tracks, isLoading, error, refreshTracks: fetchTopTracks};
};
