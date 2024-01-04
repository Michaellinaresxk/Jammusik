import type { UseCase } from '../../../primary/UseCase';
import { CategoryResource } from '../../../infra/category/CategoryResource';
import { CategoryView } from '../../../views/CategoryView';

export class GetCategoriesUseCase implements UseCase {
  constructor(private categoryRepository: CategoryResource) {}

  async execute(): Promise<CategoryView[]> {
    const categories = await this.categoryRepository.getCategories();
    return categories.map(CategoryView.fromDomain);
  }
}
