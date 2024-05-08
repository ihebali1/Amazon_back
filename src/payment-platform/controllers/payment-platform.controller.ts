import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdatePaymentPlatformDto } from '../dto/update-payment-platform.dto';
import { PaymentPlatformEnum } from '../enums/payment-platform.enum';
import { PaymentPlatformService } from '../services/payment-platform.service';

@ApiTags('PaymentPlatform')
@Controller('paymentPlatforms')
export class PaymentPlatformController {
  constructor(
    private readonly paymentPlatformService: PaymentPlatformService,
  ) {}

  @Get()
  findAll() {
    return this.paymentPlatformService.findAll();
  }

  @Get('paypal')
  getpapal() {
    return this.paymentPlatformService.findOne(PaymentPlatformEnum.PAYPAL);
  }

  @Get('stripe')
  getstripe() {
    return this.paymentPlatformService.findOne(PaymentPlatformEnum.STRIPE);
  }

  @Get('bankAcount')
  getbankAcount() {
    return this.paymentPlatformService.findOne(PaymentPlatformEnum.BankAcount);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentPlatformDto: UpdatePaymentPlatformDto,
  ) {
    return this.paymentPlatformService.update(id, updatePaymentPlatformDto);
  }
}
