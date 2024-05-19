import type { UseCase } from "../../primary/UseCase";
import { CategoryResource } from "../../infra/category/CategoryResource";
import { SongView } from "../../views/SongView";

export class GetSongListByCategoryUseCase implements UseCase {
  constructor(private categoryRepository: CategoryResource) {}

  async execute(categoryId: string, userId: string): Promise<SongView[]> {
    const songListByCategory =
      await this.categoryRepository.getSongListByCategory(categoryId, userId);
    return songListByCategory.map(SongView.fromDomain);
  }
}
