import type { Song } from "../../types/songTypes";
import type Category from "./Category";

export default interface CategoryRepository {
  getCategories(): Promise<Category[]>;
  getSongListByCategory(categoryId: string, userId: string): Promise<Song[]>;
  getAllSongsByUserId(userId: string): Promise<Song[]>;
}
