export class TabFinderService {
  static getSearchUrls(artist, title) {
    const encodedArtist = encodeURIComponent(artist.trim());
    const encodedTitle = encodeURIComponent(title.trim());

    return {
      // Ultimate Guitar
      ultimateGuitar: `https://www.ultimate-guitar.com/search.php?search_type=title&value=${encodedTitle}+${encodedArtist}`,
      // Songsterr
      songsterr: `https://www.songsterr.com/a/wa/search?pattern=${encodedTitle}+${encodedArtist}`,
      // E-Chords
      echords: `https://www.e-chords.com/search?q=${encodedTitle}+${encodedArtist}`,
      // Cifra Club (for songs in Portuguese/Spanish)
      cifraClub: `https://www.cifraclub.com.br/${this.slugify(
        artist,
      )}/${this.slugify(title)}`,
    };
  }

  static slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with -
      .trim();
  }

  static async findBestTabUrl(artist, title) {
    const searchUrls = this.getSearchUrls(artist, title);

    // We return the default Ultimate Guitar URL as it usually has the best collection
    return searchUrls.ultimateGuitar;
  }
}
