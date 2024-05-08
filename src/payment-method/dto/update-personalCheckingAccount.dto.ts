import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonalCheckingAccountDto } from './create-personalCheckingAccount.dto';

export class UpdatePersonalCheckingAccountDto extends PartialType(
  CreatePersonalCheckingAccountDto,
) {}
