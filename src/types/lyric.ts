import {LyricLine} from './songTypes';

export interface CachedLyrics {
  lyrics: LyricLine[];
  timestamp: number;
}
