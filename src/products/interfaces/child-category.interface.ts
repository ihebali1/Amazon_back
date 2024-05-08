import { Attribute } from '../entities/attribute.entity';
import { VariationTheme } from '../entities/variation-theme.entity';
import { IParentCategory } from './parent-category.interface';
import { IProduct } from './product.interface';

export interface IChildCategory {
  id: string;

  name: string;

  arName: string;

  simpleProducts: IProduct[] | string[];

  parentCategories: IParentCategory[];

  variationThemes: VariationTheme[];

  attributes: Attribute[];
}
