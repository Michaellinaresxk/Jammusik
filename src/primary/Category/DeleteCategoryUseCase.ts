import type { UseCase } from "../UseCase";
import { CategoryResource } from "../../infra/category/CategoryResource";

export class DeleteCategoryUseCase implements UseCase {
  constructor(private categoryResource: CategoryResource) {}

  async execute(userId: string, categoryId: string) {
    await this.categoryResource.deleteCategory(userId, categoryId);
  }
}
