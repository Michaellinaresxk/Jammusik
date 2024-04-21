import Song from "../song/Song";
import type Category from "./Category";

export default interface CategoryRepository {
  getCategories(): Promise<Category[]>;
  getAllSongsByUserId(userId: string): Promise<Song[]>;
}
