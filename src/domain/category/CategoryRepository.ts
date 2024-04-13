import type Category from "./Category";

export default interface CategoryRepository {
  getCategories(): Promise<Category[]>;
}
