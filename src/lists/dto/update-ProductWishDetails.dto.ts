import { PartialType } from '@nestjs/mapped-types';
import { CreateproductWishDetailsDto } from './create-productWishDetails.dto';

export class UpdateProductWishDetailsDto extends PartialType(
  CreateproductWishDetailsDto,
) {}
