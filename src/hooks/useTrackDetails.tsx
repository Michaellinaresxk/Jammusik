// hooks/useTrackDetails.ts
import {useState, useEffect} from 'react';
import axios from 'axios';
import {API_CONFIG} from '../infra/api/apikeyLastFM';

interface TrackDetails {
  name: string;
  artist: string;
  imageUrl: string | null;
  album?: string;
  duration?: string;
  listeners?: string;
  playcount?: string;
  description?: string;
}

export const useTrackDetails = (trackName: string, artistName: string) => {
  const [details, setDetails] = useState<TrackDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrackDetails = async () => {
      try {
        const response = await axios.get(API_CONFIG.BASE_URL, {
          params: {
            method: 'track.getInfo',
            api_key: API_CONFIG.LASTFM_API_KEY,
            artist: artistName,
            track: trackName,
            format: 'json',
          },
        });

        const trackData = response.data.track;

        setDetails({
          name: trackData.name,
          artist: trackData.artist.name,
          imageUrl: trackData.album?.image?.[3]['#text'] || null,
          album: trackData.album?.title,
          duration: trackData.duration
            ? Math.floor(trackData.duration / 1000 / 60) +
              ':' +
              ((trackData.duration / 1000) % 60)
            : undefined,
          listeners: trackData.listeners,
          playcount: trackData.playcount,
          description: trackData.wiki?.summary,
        });
      } catch (err) {
        setError(err.message);
        console.error('Error fetching track details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackDetails();
  }, [trackName, artistName]);

  return {details, loading, error};
};
