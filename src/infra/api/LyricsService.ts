import axios, {AxiosError} from 'axios';
import {LyricLine} from '../../types/songTypes';

const BASE_URL = 'https://api.lyrics.ovh/v1';

class LyricsService {
  async getLyricsByArtistAndTitle(
    artist: string,
    title: string,
  ): Promise<LyricLine[]> {
    if (!artist || !title) {
      throw new Error('Artist and title are required');
    }

    try {
      console.log(`Fetching lyrics for ${artist} - ${title}`);

      const response = await axios.get(
        `${BASE_URL}/${encodeURIComponent(artist)}/${encodeURIComponent(
          title,
        )}`,
        {
          timeout: 10000, // 10 segundos
        },
      );

      console.log('API Response:', response.data);

      if (!response.data || !response.data.lyrics) {
        throw new Error('No lyrics found in response');
      }

      // Convertir letra a nuestro formato con timing
      const lines = response.data.lyrics
        .split('\n')
        .filter(line => line.trim()) // Remover líneas vacías
        .map((line, index) => ({
          text: line,
          startTime: index * 4000, // 4 segundos por línea
          endTime: (index + 1) * 4000,
        }));

      if (lines.length === 0) {
        throw new Error('No lyrics content found');
      }

      console.log(`Processed ${lines.length} lines of lyrics`);
      return lines;
    } catch (error) {
      console.log('Error details:', error);

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.code === 'ECONNABORTED') {
          throw new Error(
            'La solicitud tardó demasiado tiempo. Por favor, intenta de nuevo.',
          );
        }

        switch (axiosError.response?.status) {
          case 404:
            throw new Error('No se encontró la letra para esta canción');
          case 504:
            throw new Error('El servicio no está disponible en este momento');
          case 500:
            throw new Error('Error en el servidor de letras');
          default:
            throw new Error(`Error al buscar la letra: ${axiosError.message}`);
        }
      }

      throw new Error('Error inesperado al buscar la letra');
    }
  }
}

export const lyricsService = new LyricsService();
