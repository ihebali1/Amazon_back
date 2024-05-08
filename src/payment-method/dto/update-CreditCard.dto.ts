import { PartialType } from '@nestjs/mapped-types';
import { CreateCreditCardDto } from './create-creditCard.dto';

export class UpdateCreditCardDto extends PartialType(CreateCreditCardDto) {}
