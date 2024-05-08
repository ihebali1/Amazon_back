import { ChildCategory } from '../entities/child-category.entity';
import { VariationTheme } from '../entities/variation-theme.entity';
import { AttributeTypeEnum } from '../enums/attribute-type.enum';
import { IAttributeChoice } from './attribute-choice.interface';
import { IAttributeValue } from './attribute-value.interface';

export interface IAttribute {
  id: string;

  key: string;

  arKey: string;

  type: AttributeTypeEnum;

  isOrdered: boolean;

  childCategories: ChildCategory[];

  variationThemes: VariationTheme[];

  attributeChoices: IAttributeChoice[] | string[];

  attributeValues: IAttributeValue[] | string[];
}
