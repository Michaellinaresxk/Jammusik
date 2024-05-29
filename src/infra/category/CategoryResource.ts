import type CategoryRepository from "../../domain/category/CategoryRepository";
import { CategoryCaller } from "./CategoryCaller";
import Category from "../../domain/category/Category";
import Song from "../../domain/song/Song";

export class CategoryResource implements CategoryRepository {
  constructor(public readonly categoryCaller: CategoryCaller) {}

  async createCategory(userId: string, title: string): Promise<Category> {
    const apiCategory = await this.categoryCaller.createCategory(userId, title);
    return new Category(apiCategory.userId, apiCategory.title);
  }

  async getCategories(userId: string): Promise<Category[]> {
    const apiCategory = await this.categoryCaller.getCategories(userId);
    return apiCategory.map(
      apiCategory => new Category(apiCategory.id, apiCategory.title),
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
      apiSong =>
        new Song(
          apiSong.id,
          apiSong.title,
          apiSong.artist,
          apiSong.categoryId,
          apiSong.playlistId,
        ),
    );
  }
}
