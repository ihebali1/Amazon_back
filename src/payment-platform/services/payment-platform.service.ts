import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdatePaymentPlatformDto } from '../dto/update-payment-platform.dto';
import { PaymentPlatformEnum } from '../enums/payment-platform.enum';
import { PaymentPlatformRepository } from '../repositories/payment-platform.repository';

@Injectable()
export class PaymentPlatformService {
  constructor(private paymentPlatformRepository: PaymentPlatformRepository) {}

  findAll() {
    return this.paymentPlatformRepository.find();
  }

  findOne(type: PaymentPlatformEnum) {
    return this.paymentPlatformRepository.findOne({ type: type });
  }

  public async update(
    id: string,
    updatePaymentPlatformDto: UpdatePaymentPlatformDto,
  ): Promise<any> {
    try {
      const paymentPlatform = await this.paymentPlatformRepository.findOne({
        id: id,
      });
      if (paymentPlatform.type == PaymentPlatformEnum.PAYPAL) {
        paymentPlatform.papalName = updatePaymentPlatformDto.papalName;
        paymentPlatform.papalNumber = updatePaymentPlatformDto.papalNumber;
      } else if (paymentPlatform.type == PaymentPlatformEnum.STRIPE) {
        paymentPlatform.stripeName = updatePaymentPlatformDto.stripeName;
        paymentPlatform.stripeNumber = updatePaymentPlatformDto.stripeNumber;
      } else {
        paymentPlatform.bankName = updatePaymentPlatformDto.bankName;
        paymentPlatform.bankNumber = updatePaymentPlatformDto.bankNumber;
      }
      paymentPlatform.type = updatePaymentPlatformDto.type;
      return await this.paymentPlatformRepository.save(paymentPlatform);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
