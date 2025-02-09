import {useState, useCallback} from 'react';
import {chordGeneratorService} from '../infra/api/chordGenerator';

export const useChordGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedChords, setGeneratedChords] = useState(null);

  const generateChords = useCallback(async (title, artist) => {
    setLoading(true);
    setError(null);

    try {
      const data = await chordGeneratorService.generateChords(title, artist);
      setGeneratedChords(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    generateChords,
    loading,
    error,
    generatedChords,
  };
};
