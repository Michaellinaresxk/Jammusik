import type { CategoryResource } from "../../infra/category/CategoryResource";
import { GetCategoriesUseCase } from "./GetCategoriesUseCase";
import { GetSongListByCategoryUseCase } from "./GetSongListByCategoryUseCase";

import type { CategoryView } from "../../views/CategoryView";
import { SongView } from "../../views/SongView";

export class CategoryService {
  private getCategoriesUseCase: GetCategoriesUseCase;
  private getSongListByCategoryUseCase: GetSongListByCategoryUseCase;

  constructor(private readonly categoryResource: CategoryResource) {
    this.getCategoriesUseCase = new GetCategoriesUseCase(categoryResource);
    this.getSongListByCategoryUseCase = new GetSongListByCategoryUseCase(
      categoryResource,
    );
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
}
