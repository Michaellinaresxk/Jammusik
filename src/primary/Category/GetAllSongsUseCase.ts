import type { UseCase } from "../../primary/UseCase";
import { CategoryResource } from "../../infra/category/CategoryResource";
import { SongView } from "../../views/SongView";

export class GetAllSongsUseCase implements UseCase {
  constructor(private categoryRepository: CategoryResource) {}

  async execute(userId: string): Promise<SongView[]> {
    const songs = await this.categoryRepository.getAllSongsByUserId(userId);
    return songs.map(SongView.fromDomain);
  }
}