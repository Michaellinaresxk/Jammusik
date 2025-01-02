import {CategoryResource} from '../infra/category/CategoryResource';
import {CategoryCaller} from '../infra/category/CategoryCaller';
import {CategoryService} from '../primary/Category/index';

const categoryCaller = new CategoryCaller();
const categoryResource = new CategoryResource(categoryCaller);
const categoryService = new CategoryService(categoryResource);

export {categoryService};
