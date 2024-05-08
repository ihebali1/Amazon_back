import { Module } from '@nestjs/common';
import { OrderProductModule } from 'src/order-product/order-product.module';
import { BackOfiiceOrdersController } from './back-office-orders.controller';

@Module({
  imports: [OrderProductModule],
  controllers: [BackOfiiceOrdersController],
})
export class BackOfficeOrdersModule {}
