import type {CategoryProperties} from '../../types/properties';

class Category {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly userId: string,
  ) {}
  static fromProperties(properties: CategoryProperties) {
    const {id, title, userId} = properties;
    return new Category(id, title, userId);
  }
  get properties(): CategoryProperties {
    return Object.freeze({
      id: this.id,
      title: this.title,
      userId: this.userId,
    });
  }
}

export default Category;
