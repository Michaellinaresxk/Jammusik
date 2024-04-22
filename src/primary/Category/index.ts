import type { CategoryResource } from "../../infra/category/CategoryResource";
import { GetCategoriesUseCase } from "./GetCategoriesUseCase";
import { GetAllSongsUseCase } from "./GetAllSongsUseCase";
import { GetSongListByCategoryUseCase } from "./GetSongListByCategoryUseCase";

import type { CategoryView } from "../../views/CategoryView";
import { SongView } from "../../views/SongView";

export class CategoryService {
  private getCategoriesUseCase: GetCategoriesUseCase;
  private getSongListByCategoryUseCase: GetSongListByCategoryUseCase;
  private getAllSongsUseCase: GetAllSongsUseCase;

  constructor(private readonly categoryResource: CategoryResource) {
    this.getCategoriesUseCase = new GetCategoriesUseCase(categoryResource);
    this.getSongListByCategoryUseCase = new GetSongListByCategoryUseCase(
      categoryResource,
    );
    this.getAllSongsUseCase = new GetAllSongsUseCase(categoryResource);
  }

  async getCategories(): Promise<CategoryView[]> {
    return await this.getCategoriesUseCase.execute();
  }

  async getSongListByCategory(
    categoryId: string,
    userId: string,
  ): Promise<SongView[]> {
    return await this.getSongListByCategoryUseCase.execute(categoryId, userId);
  }

  async getAllSongsByUserId(userId: string): Promise<SongView[]> {
    return await this.getAllSongsUseCase.execute(userId);
  }
}
