import Song from '../song/Song';
import type Category from './Category';

export default interface CategoryRepository {
  createCategory(title: string, userId: string,): Promise<Category>;
  getCategories(userId: string): Promise<Category[]>;
  getSongListByCategory(categoryId: string, userId: string): Promise<Song[]>;
  getAllSongsByUserId(userId: string): Promise<Song[]>;
  updateCategory(categoryId: string, title: string): Promise<Category>;
  deleteCategory(userId: string, categoryId: string): Promise<void>;
}
