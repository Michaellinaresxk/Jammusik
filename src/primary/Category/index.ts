import type { CategoryResource } from "../../infra/category/CategoryResource";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { GetCategoriesUseCase } from "./GetCategoriesUseCase";
import { GetSongListByCategoryUseCase } from "./GetSongListByCategoryUseCase";
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";
import { GetAllSongsUseCase } from "./GetAllSongsUseCase";

import type { CategoryView } from "../../views/CategoryView";
import { SongView } from "../../views/SongView";

export class CategoryService {
  private createCategoryUseCase: CreateCategoryUseCase;
  private getCategoriesUseCase: GetCategoriesUseCase;
  private getSongListByCategoryUseCase: GetSongListByCategoryUseCase;
  private getAllSongsUseCase: GetAllSongsUseCase;
  private deleteCategoryUseCase: DeleteCategoryUseCase;

  constructor(private readonly categoryResource: CategoryResource) {
    this.createCategoryUseCase = new CreateCategoryUseCase(categoryResource);
    this.getCategoriesUseCase = new GetCategoriesUseCase(categoryResource);
    this.getSongListByCategoryUseCase = new GetSongListByCategoryUseCase(
      categoryResource,
    );
    this.getAllSongsUseCase = new GetAllSongsUseCase(categoryResource);
    this.deleteCategoryUseCase = new DeleteCategoryUseCase(categoryResource);
  }

  async createCategory(userId: string, title: string): Promise<CategoryView> {
    return await this.createCategoryUseCase.execute(userId, title);
  }

  async getCategories(userId: string): Promise<CategoryView[]> {
    return await this.getCategoriesUseCase.execute(userId);
  }

  async getSongListByCategory(
    userId: string,
    categoryId: string,
  ): Promise<SongView[]> {
    return await this.getSongListByCategoryUseCase.execute(userId, categoryId);
  }

  async getAllSongsByUserId(userId: string): Promise<SongView[]> {
    return await this.getAllSongsUseCase.execute(userId);
  }

  async deleteCategory(userId: string, categoryId: string): Promise<void> {
    return await this.deleteCategoryUseCase.execute(userId, categoryId);
  }
}