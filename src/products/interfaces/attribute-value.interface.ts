import { IAttribute } from './attribute.interface';
import { IProduct } from './product.interface';

export interface IAttributeValue {
  id: string;

  value: string;

  attribute: IAttribute | string;

  simpleProduct: IProduct | string;
}
