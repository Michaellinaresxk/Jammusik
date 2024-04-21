import type { CategoryResource } from "../../infra/category/CategoryResource";
import { GetCategoriesUseCase } from "./GetCategoriesUseCase";
import { GetAllSongsUseCase } from "./GetAllSongsUseCase";
import type { CategoryView } from "../../views/CategoryView";
import { SongView } from "../../views/SongView";

export class CategoryService {
  private getCategoriesUseCase: GetCategoriesUseCase;
  private getAllSongsUseCase: GetAllSongsUseCase;

  constructor(private readonly categoryResource: CategoryResource) {
    this.getCategoriesUseCase = new GetCategoriesUseCase(categoryResource);
    this.getAllSongsUseCase = new GetAllSongsUseCase(categoryResource);
  }

  async getCategories(): Promise<CategoryView[]> {
    return await this.getCategoriesUseCase.execute();
  }

  async getAllSongsByUserId(userId: string): Promise<SongView[]> {
    return await this.getAllSongsUseCase.execute(userId);
  }
}
