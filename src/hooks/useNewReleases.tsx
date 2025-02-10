import {useState, useCallback, useEffect} from 'react';
import spotifyConfig from '../infra/api/spotifyConfig';
import {NewRelease} from '../types/tracksTypes';

export const useNewReleases = () => {
  const [newReleases, setNewReleases] = useState<NewRelease[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNewReleases = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('🚀 Fetching new releases...');
      const data = await spotifyConfig.getNewReleases();

      if (!Array.isArray(data)) {
        throw new Error('Invalid response format: expected an array');
      }

      // Basic data validation
      const validatedData = data.filter(release => {
        const isValid = release.id && release.name && release.external_url;
        if (!isValid) {
          console.warn('⚠️ Invalid release data:', release);
        }
        return isValid;
      });

      setNewReleases(validatedData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch new releases';
      console.error('❌ Error in useNewReleases:', {
        error: err,
        message: errorMessage,
      });
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNewReleases();
  }, [fetchNewReleases]);

  return {
    newReleases,
    isLoading,
    error,
    refreshNewReleases: fetchNewReleases,
  };
};
