import { PartialType } from '@nestjs/mapped-types';
import { CreateProductRegistryDetailsDto } from './create-productRegistryDetails.dto';

export class UpdateProductRegistryDetailsDto extends PartialType(
  CreateProductRegistryDetailsDto,
) {}
