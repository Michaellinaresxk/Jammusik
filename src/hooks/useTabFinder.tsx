import {useState, useCallback} from 'react';

export const useTabFinder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tabUrl, setTabUrl] = useState(null);

  const findTab = useCallback(async (artist, title) => {
    if (!artist || !title) {
      setError('Artist and title are required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = await TabFinderService.findBestTabUrl(artist, title);
      setTabUrl(url);
      return url;
    } catch (err) {
      setError('Failed to find tab URL');
      console.error('Tab finder error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    tabUrl,
    findTab,
  };
};
