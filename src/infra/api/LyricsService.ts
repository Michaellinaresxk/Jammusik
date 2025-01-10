import axios, {AxiosError} from 'axios';
import {LyricLine} from '../../types/songTypes';

const BASE_URL = 'https://api.lyrics.ovh/v1';

interface CachedLyrics {
  lyrics: LyricLine[];
  timestamp: number;
}

class LyricsService {
  // Cache using Map
  private cache: Map<string, CachedLyrics> = new Map();

  // Time to expiration: 24 hours in milliseconds
  private CACHE_EXPIRY = 24 * 60 * 60 * 1000;

  private getCacheKey(artist: string, title: string): string {
    return `${artist.toLowerCase()}_${title.toLowerCase()}`;
  }

  private isExpired(timestamp: number): boolean {
    return Date.now() - timestamp > this.CACHE_EXPIRY;
  }

  async getLyricsByArtistAndTitle(
    artist: string,
    title: string,
  ): Promise<LyricLine[]> {
    if (!artist || !title) {
      throw new Error('Artist and title are required');
    }

    try {
      // Verify cache
      const cacheKey = this.getCacheKey(artist, title);
      const cached = this.cache.get(cacheKey);

      // If it exists in cache and has not expired, return it
      if (cached && !this.isExpired(cached.timestamp)) {
        console.log('Returning lyrics from cache');
        return cached.lyrics;
      }

      // If it is not cached or expired, make the request
      console.log(`Fetching lyrics for ${artist} - ${title}`);
      const response = await axios.get(
        `${BASE_URL}/${encodeURIComponent(artist)}/${encodeURIComponent(
          title,
        )}`,
        {
          timeout: 10000,
        },
      );

      if (!response.data || !response.data.lyrics) {
        throw new Error('No lyrics found in response');
      }

      // Process the letter
      const lines = response.data.lyrics
        .split('\n')
        .filter(line => line.trim())
        .map((line, index) => ({
          text: line,
          startTime: index * 4000,
          endTime: (index + 1) * 4000,
        }));

      if (lines.length === 0) {
        throw new Error('No lyrics content found');
      }

      // Save in cache
      this.cache.set(cacheKey, {
        lyrics: lines,
        timestamp: Date.now(),
      });

      console.log(`Processed and cached ${lines.length} lines of lyrics`);
      return lines;
    } catch (error) {
      console.log('Error details:', error);

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.code === 'ECONNABORTED') {
          throw new Error('Request timeout. Please try again.');
        }

        switch (axiosError.response?.status) {
          case 404:
            throw new Error('No lyrics found for this song');
          case 504:
            throw new Error('Service is currently unavailable');
          case 500:
            throw new Error('Lyrics server error');
          default:
            throw new Error(`Error fetching lyrics: ${axiosError.message}`);
        }
      }

      throw new Error('Unexpected error while fetching lyrics');
    }
  }

  // Method to clear the cache if necessary
  clearCache(): void {
    this.cache.clear();
    console.log('Cache cleared');
  }

  // Method to view the current cache status (useful for debugging)
  getCacheState(): {size: number; entries: string[]} {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys()),
    };
  }
}

export const lyricsService = new LyricsService();
