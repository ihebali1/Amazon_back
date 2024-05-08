import { PartialType } from '@nestjs/mapped-types';
import { CreateVariationThemeDto } from './create-variation-theme.dto';

export class UpdateVariationThemeDto extends PartialType(
  CreateVariationThemeDto,
) {}
