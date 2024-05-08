import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/order-product/entities/order.entity';
import { OrderRepository } from 'src/order-product/repositories/order.repository';
import { Payment } from './entities/payment.entity';
import { PaymentRepository } from './repositories/payment.repository';
import { PaymentMethod } from 'src/payment-method/entities/payment-method.entity';
import { PaymentMethodRepository } from 'src/payment-method/repositories/PaymentMethod.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderRepository,
      PaymentRepository,
      Payment,
      PaymentMethod,
      PaymentMethodRepository,
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
