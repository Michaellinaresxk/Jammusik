import type Category from "../domain/category/Category";

export class CategoryView {
  private constructor(
    public readonly id: string,
    public readonly title: string,
  ) {}

  static fromDomain(category: Category) {
    const { id, title } = category;
    if (!title) {
        console.warn(`Category with ID ${id} is missing a title`);
    }
    return new CategoryView(id, title || 'Untitled');
  }
}



