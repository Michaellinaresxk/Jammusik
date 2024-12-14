import type { UseCase } from "../UseCase";
import { CategoryResource } from "../../infra/category/CategoryResource";
import { CategoryView } from "../../views/CategoryView";

export class CreateCategoryUseCase implements UseCase {
  constructor(private categoryResource: CategoryResource) {}

  async execute(userId: string, title: string): Promise<CategoryView> {
    try {
      if (!(typeof userId === "string")) {
        throw new Error("Category id should be a string");
      }

      const categories = await this.categoryResource.createCategory(
        title,
        userId,
      );
      return CategoryView.fromDomain(categories);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}