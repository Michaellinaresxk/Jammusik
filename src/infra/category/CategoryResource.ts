import type CategoryRepository from '../../domain/category/CategoryRepository';
import { CategoryCaller } from './CategoryCaller';
import Category from '../../domain/category/Category';
import Song from '../../domain/song/Song';

export class CategoryResource implements CategoryRepository {
  constructor(public readonly categoryCaller: CategoryCaller) {}

  async getCategories(): Promise<Category[]> {
    const apiCategory = await this.categoryCaller.getCategories();
    return apiCategory.map(
      (apiCategory: { id: string; title: string }) =>
        new Category(apiCategory.id, apiCategory.title)
    );
  }

  async getSongListByCategory(
    categoryId: string,
    userId: string
  ): Promise<Song[]> {
    const apiSongs = await this.categoryCaller.getSongListByCategory(
      categoryId,
      userId
    );
    return apiSongs.map(
      (apiSong) =>
        new Song(
          apiSong.playlistId,
          apiSong.id,
          apiSong.title,
          apiSong.artist,
          apiSong.categoryId
        )
    );
  }

  async getAllSongsByUserId(userId: string): Promise<Song[]> {
    const apiSongs = await this.categoryCaller.getAllSongsByUserId(userId);
    return apiSongs.map(
      (apiSong: {
        playlistId: string;
        id: string;
        title: string;
        artist: string;
        categoryId: string;
      }) =>
        new Song(
          apiSong.playlistId,
          apiSong.id,
          apiSong.title,
          apiSong.artist,
          apiSong.categoryId
        )
    );
  }
}
