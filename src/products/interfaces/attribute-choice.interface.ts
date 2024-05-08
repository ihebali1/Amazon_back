import { BuyableProduct } from '../entities/product.entity';
import { ChoiceTypeEnum } from '../enums/choice-type.enum';
import { IAttribute } from './attribute.interface';

export interface IAttributeChoice {
  id: string;

  value: string;

  type: ChoiceTypeEnum;

  order: number;

  attribute: IAttribute | string;

  simpleProducts: BuyableProduct[];
}
