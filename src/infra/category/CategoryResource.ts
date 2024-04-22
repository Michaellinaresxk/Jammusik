import type CategoryRepository from "../../domain/category/CategoryRepository";
import { CategoryCaller } from "./CategoryCaller";
import Category from "../../domain/category/Category";

export class CategoryResource implements CategoryRepository {
  constructor(public readonly categoryCaller: CategoryCaller) {}

  async getCategories(): Promise<Category[]> {
    const apiCategory = await this.categoryCaller.getCategories();
    return apiCategory.map(
      (apiCategory: { id: string; title: string }) =>
        new Category(apiCategory.id, apiCategory.title),
    );
  }
}
