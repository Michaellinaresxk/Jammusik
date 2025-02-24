export const handleChordsGenerated = (chordData: {
  key: any;
  progressions: {verse: any; chorus: any};
  recommendations: {strumming: any; capo: any};
  difficulty: any;
}) => {
  try {
    const processedData = {
      key: chordData.key,
      chords: {
        verse: chordData.progressions.verse,
        chorus: chordData.progressions.chorus,
      },
      strummingPatterns: chordData.recommendations?.strumming || [],
      difficulty: chordData.difficulty,
      capo: chordData.recommendations?.capo || null,
    };

    return processedData;
  } catch (error) {
    console.error('Error processing chord data:', error);
    throw new Error('Failed to process chord data');
  }
};
