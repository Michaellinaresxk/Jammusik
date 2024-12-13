import type CategoryRepository from '../../domain/category/CategoryRepository';
import {CategoryCaller} from './CategoryCaller';
import Category from '../../domain/category/Category';
import Song from '../../domain/song/Song';
export class CategoryResource implements CategoryRepository {
  constructor(public readonly categoryCaller: CategoryCaller) {}

  async createCategory(userId: string, title: string): Promise<Category> {
    const apiCategory = await this.categoryCaller.createCategory(title);
    return new Category(apiCategory.id, apiCategory.title, userId);
  }

  async getCategories(userId: string): Promise<Category[]> {
    const apiCategories = await this.categoryCaller.getCategories(userId);
    return apiCategories.map(
      category => new Category(category.id, category.title, userId),
    );
  }

  async getSongListByCategory(
    categoryId: string,
    userId: string,
  ): Promise<Song[]> {
    const apiSongs = await this.categoryCaller.getSongListByCategory(
      categoryId,
      userId,
    );
    return apiSongs.map(
      song =>
        new Song(
          song.id,
          song.categoryId,
          song.title,
          song.artist,
          song.isDone,
          song.playlistId,
        ),
    );
  }

  async getAllSongsByUserId(userId: string): Promise<Song[]> {
    const apiSongs = await this.categoryCaller.getAllSongsByUserId(userId);
    return apiSongs.map(
      song =>
        new Song(
          song.id,
          song.categoryId,
          song.title,
          song.artist,
          song.isDone,
          song.playlistId,
        ),
    );
  }

  async updateCategory(categoryId: string, title: string): Promise<Category> {
    await this.categoryCaller.updateCategory(categoryId, title);
    return new Category(categoryId, title);
  }

  async deleteCategory(userId: string, categoryId: string) {
    return await this.categoryCaller.deleteCategory(userId, categoryId);
  }
}
