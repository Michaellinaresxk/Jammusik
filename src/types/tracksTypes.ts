export interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  image?: string;
  preview_url?: string;
  release_date?: string;
}

export interface SpotifyConfig {
  getTopTracks: () => Promise<Track[]>;
  getTrackDetails: (trackId: string) => Promise<Track>;
}