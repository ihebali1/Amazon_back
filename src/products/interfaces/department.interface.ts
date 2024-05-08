import { IParentCategory } from './parent-category.interface';

export interface IDepartment {
  id: string;

  name: string;

  arName: string;

  parentCategories: IParentCategory[] | string[];
}
