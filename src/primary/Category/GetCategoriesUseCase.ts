import type {UseCase} from '../UseCase';
import {CategoryResource} from '../../infra/category/CategoryResource';
import {CategoryView} from '../../views/CategoryView';

export class GetCategoriesUseCase implements UseCase {
  constructor(private categoryRepository: CategoryResource) {}

  async execute(userId: string): Promise<CategoryView[]> {
    const categories = await this.categoryRepository.getCategories(userId);
    return categories.map(CategoryView.fromDomain);
  }
}
