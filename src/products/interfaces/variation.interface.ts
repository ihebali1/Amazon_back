import { ProductConditionEnum } from '../enums/product-condition.enum';
import { IParentListing } from './parent-listing-interface';
import { IProduct } from './product.interface';

export interface IVariation extends IProduct {
  quantity: number;

  condition: ProductConditionEnum;

  price: number;

  parentListing: IParentListing | string;
}
