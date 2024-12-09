import Song from '../song/Song';
import type Category from './Category';

export default interface CategoryRepository {
  createCategory(userId: string, title: string): Promise<Category>;
  getCategories(userId: string): Promise<Category[]>;
  getSongListByCategory(categoryId: string, userId: string): Promise<Song[]>;
  getAllSongsByUserId(userId: string): Promise<Song[]>;
  updateCategoryt(categoryId: string, title: string): Promise<Category>;
  deleteCategory(userId: string, categoryId: string): Promise<void>;
}
