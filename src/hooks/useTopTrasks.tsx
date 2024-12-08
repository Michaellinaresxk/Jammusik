// src/hooks/useTopTracks.js
import {useState, useEffect} from 'react';
import axios from 'axios';
import {API_CONFIG} from '../infra/api/apikeyLastFM';

export const useTopTracks = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await axios.get(API_CONFIG.BASE_URL, {
          params: {
            method: 'chart.gettoptracks',
            api_key: API_CONFIG.LASTFM_API_KEY,
            format: 'json',
            limit: 10,
          },
        });
        console.log('Trying to connect to:', API_CONFIG.BASE_URL);
        console.log('Params:', response.data);
        if (!response.data?.tracks?.track) {
          throw new Error('Invalid response format');
        }
        const formattedTracks = response.data.tracks.track.map(track => ({
          id: track.mbid || String(Math.random()),
          name: track.name,
          artist: track.artist.name,
          imageUrl: track.image?.[2]?.['#text'] || null,
        }));
        setTracks(formattedTracks);
      } catch (err) {
        setError(err.message);
        console.error('Detailed error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopTracks();
  }, []);
  return {tracks, loading, error};
};
