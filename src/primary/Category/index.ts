import type { CategoryResource } from "../../infra/category/CategoryResource";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { GetCategoriesUseCase } from "./GetCategoriesUseCase";
import { GetSongListByCategoryUseCase } from "./GetSongListByCategoryUseCase";
import type { CategoryView } from "../../views/CategoryView";
import { SongView } from "../../views/SongView";

export class CategoryService {
  private createCategoryUseCase: CreateCategoryUseCase;
  private getCategoriesUseCase: GetCategoriesUseCase;
  private getSongListByCategoryUseCase: GetSongListByCategoryUseCase;

  constructor(private readonly categoryResource: CategoryResource) {
    this.createCategoryUseCase = new CreateCategoryUseCase(categoryResource);
    this.getCategoriesUseCase = new GetCategoriesUseCase(categoryResource);
    this.getSongListByCategoryUseCase = new GetSongListByCategoryUseCase(
      categoryResource,
    );
  }

  async createCategory(userId: string, title: string): Promise<CategoryView> {
    return await this.createCategoryUseCase.execute(userId, title);
  }

  async getCategories(userId: string): Promise<CategoryView[]> {
    return await this.getCategoriesUseCase.execute(userId);
  }

  async getSongListByCategory(
    categoryId: string,
    userId: string,
  ): Promise<SongView[]> {
    return await this.getSongListByCategoryUseCase.execute(categoryId, userId);
  }
}
