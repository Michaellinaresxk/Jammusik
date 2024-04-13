import type { CategoryResource } from "../../infra/category/CategoryResource";
import { GetCategoriesUseCase } from "./GetCategoriesUseCase";

import type { CategoryView } from "../../views/CategoryView";

export class CategoryService {
  private getCategoriesUseCase: GetCategoriesUseCase;

  constructor(private readonly categoryResource: CategoryResource) {
    this.getCategoriesUseCase = new GetCategoriesUseCase(categoryResource);
  }

  async getCategories(): Promise<CategoryView[]> {
    return await this.getCategoriesUseCase.execute();
  }
}
