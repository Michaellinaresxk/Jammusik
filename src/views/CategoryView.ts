import type Category from "../domain/category/Category";

export class CategoryView {
  categoryId: any;
  label: any;
  value: any;
  private constructor(
    public readonly id: string,
    public readonly title: string,
  ) {}

  static fromDomain(category: Category) {
    const { id, title } = category;
    return new CategoryView(id, title);
  }
}
