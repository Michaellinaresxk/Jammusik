import {useState, useCallback} from 'react';
import {chordGeneratorService} from '../infra/api/chordGenerator';

export const useChordGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [generatedChords, setGeneratedChords] = useState(null);

  const generateChords = useCallback(async (title: string, artist: string) => {
    if (!title || !artist) {
      setError(new Error('Title and artist are required'));
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await chordGeneratorService.generateChords(title, artist);
      setGeneratedChords(data);
      return data;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error('Failed to generate chords');
      setError(error);
      throw error;
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
