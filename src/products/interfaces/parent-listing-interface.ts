import { IVariationTheme } from './variation-theme.interface';
import { IVariation } from './variation.interface';

export interface IParentListing {
  id: string;

  variations: IVariation[] | string[];

  variationTheme: IVariationTheme | string;
}
