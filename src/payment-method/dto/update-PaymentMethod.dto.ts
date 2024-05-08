import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentMethodDto } from './create-paymentMethod.dto';

export class UpdatePaymentMethodDto extends PartialType(
  CreatePaymentMethodDto,
) {}
