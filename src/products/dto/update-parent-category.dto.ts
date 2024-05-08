import { PartialType } from '@nestjs/mapped-types';
import { CreateParentCategoryDto } from './create-parent-category.dto';

export class UpdateParentCategoryDto extends PartialType(
  CreateParentCategoryDto,
) {}
