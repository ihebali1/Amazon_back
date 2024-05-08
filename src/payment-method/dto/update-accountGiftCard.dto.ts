import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountGiftCardDto } from './create-accountGiftCard.dto';

export class UpdateaccountGiftCardDto extends PartialType(
  CreateAccountGiftCardDto,
) {}
