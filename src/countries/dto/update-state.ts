import { PartialType } from '@nestjs/mapped-types';
import { CreateCountryDto } from './create-country.dto';
import { CreateStateDto } from './create-state.dto';

export class UpdateStateDto extends PartialType(CreateStateDto) {}
