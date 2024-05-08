import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentPlatformDto } from './create-payment-platform.dto';

export class UpdatePaymentPlatformDto extends PartialType(
  CreatePaymentPlatformDto,
) {}
