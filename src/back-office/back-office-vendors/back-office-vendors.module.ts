import { Module } from '@nestjs/common';
import { OrderProductModule } from 'src/order-product/order-product.module';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { BackOfiiceVendorsController } from './back-office-vendors.controller';

@Module({
  imports: [ProductsModule, OrderProductModule, UsersModule],
  controllers: [BackOfiiceVendorsController],
})
export class BackOfficeVendorsModule {}
