import { IChildCategory } from './child-category.interface';
import { IDepartment } from './department.interface';

export interface IParentCategory {
  id: string;

  name: string;

  arName: string;

  childCategories: IChildCategory[] | string[];

  departments: IDepartment[];
}
