import axios from 'axios';
import {MusixmatchResponse} from '../../types/songTypes';

const API_KEY = 'TU_API_KEY_AQUI';
const BASE_URL = 'https://api.musixmatch.com/ws/1.1';

class MusixmatchService {
  private async makeRequest(endpoint: string, params: object = {}) {
    try {
      const response = await axios.get<MusixmatchResponse>(
        `${BASE_URL}${endpoint}`,
        {
          params: {
            apikey: API_KEY,
            ...params,
          },
        },
      );

      if (response.data.message.header.status_code !== 200) {
        throw new Error(
          `API Error: ${response.data.message.header.status_code}`,
        );
      }

      return response.data.message.body;
    } catch (error) {
      console.error('Musixmatch API Error:', error);
      throw error;
    }
  }

  async searchTrack(artist: string, title: string) {
    const data = await this.makeRequest('/track.search', {
      q_artist: artist,
      q_track: title,
      page_size: 1,
      page: 1,
      s_track_rating: 'desc',
    });

    return data.track_list?.[0]?.track;
  }

  async getLyrics(trackId: number) {
    const data = await this.makeRequest('/track.lyrics.get', {
      track_id: trackId,
    });

    return data.lyrics?.lyrics_body;
  }

  async getLyricsByArtistAndTitle(artist: string, title: string) {
    try {
      // First search for the song
      const track = await this.searchTrack(artist, title);

      if (!track) {
        throw new Error('Track not found');
      }

      // Then get the letter
      const lyrics = await this.getLyrics(track.track_id);

      if (!lyrics) {
        throw new Error('Lyrics not found');
      }

      // Convert the letters to a format we can use
      const lines = lyrics
        .split('\n')
        .filter(line => line.trim() && !line.includes('* This Lyrics is NOT'))
        .map((line, index) => ({
          text: line,
          startTime: index * 4000, // Tiempo inicial por defecto
          endTime: (index + 1) * 4000, // 4 seconds per line by default
        }));

      return lines;
    } catch (error) {
      console.error('Error getting lyrics:', error);
      throw error;
    }
  }
}

export const musixmatchService = new MusixmatchService();
