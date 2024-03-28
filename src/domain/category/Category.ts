import type { CategoryProperties } from "@/types/properties";

class Category {
  constructor(public readonly id: string, public readonly title: string) {}
  static fromProperties(properties: CategoryProperties) {
    const { id, title } = properties;
    return new Category(id, title);
  }
  get properties(): CategoryProperties {
    return Object.freeze({
      id: this.id,
      title: this.title,
    });
  }
}

export default Category;
