import { CategoryResource } from '../infra/category/CategoryResource';
import { CategoryCaller } from '../infra/category/CategoryCaller';
import { CategoryService } from '../primary/Category/useCases/index';
import type { InjectionKey } from 'vue';

const categoryCaller = new CategoryCaller();
const categoryResource = new CategoryResource(categoryCaller);
const categoryService = new CategoryService(categoryResource);

const categoryServiceKey = Symbol() as InjectionKey<CategoryService>;
export { categoryService, categoryServiceKey };
