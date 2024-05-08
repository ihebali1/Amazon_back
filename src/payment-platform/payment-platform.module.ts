import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentPlatformController } from './controllers/payment-platform.controller';
import { PaymentPlatformRepository } from './repositories/payment-platform.repository';
import { PaymentPlatformService } from './services/payment-platform.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentPlatformRepository])],
  controllers: [PaymentPlatformController],
  providers: [PaymentPlatformService],
  exports: [PaymentPlatformService],
})
export class PaymentPlatformModule {}
