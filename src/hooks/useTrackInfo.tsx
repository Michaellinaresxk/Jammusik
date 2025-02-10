import {useState, useCallback} from 'react';
import spotifyConfig from '../infra/api/spotifyConfig';

export interface TrackInfo {
  name: string;
  artist: string;
  album: {
    name: string;
    release_date: string;
    image: string;
    type: string;
  };
  external_url: string;
  id: string;
  popularity: number;
}

export const useTrackInfo = () => {
  const [trackInfo, setTrackInfo] = useState<TrackInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrackInfo = useCallback(async (title: string, artist: string) => {
    setLoading(true);
    setError(null);

    try {
      const cleanTitle = title.trim();
      const cleanArtist = artist.trim();

      console.log('🎵 Fetching track info:', {
        title: cleanTitle,
        artist: cleanArtist,
      });

      const data = await spotifyConfig.getTrackInfo(cleanTitle, cleanArtist);

      if (!data?.track_info) {
        throw new Error('No track information received');
      }

      // Verificación de coincidencia
      const titleMatch = data.track_info.name
        .toLowerCase()
        .includes(cleanTitle.toLowerCase());
      const artistMatch = data.track_info.artist
        .toLowerCase()
        .includes(cleanArtist.toLowerCase());

      if (!titleMatch || !artistMatch) {
        console.warn('⚠️ Possible track mismatch:', {
          requested: {title: cleanTitle, artist: cleanArtist},
          received: {
            title: data.track_info.name,
            artist: data.track_info.artist,
          },
          matchDetails: {titleMatch, artistMatch},
        });
      }

      setTrackInfo(data.track_info);
      return data.track_info;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch track info';
      console.error('❌ Error fetching track info:', err);
      setError(errorMessage);
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
