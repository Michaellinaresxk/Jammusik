import type {UseCase} from '../UseCase';
import {CategoryResource} from '../../infra/category/CategoryResource';
import {CategoryView} from '../../views/CategoryView';

export class UpdateCategoryUseCase implements UseCase {
  constructor(private categoryResource: CategoryResource) {}

  async execute(categoryId: string, title: string): Promise<CategoryView> {
    try {
      const playlist = await this.categoryResource.updateCategory(
        categoryId,
        title,
      );
      return CategoryView.fromDomain(playlist);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
