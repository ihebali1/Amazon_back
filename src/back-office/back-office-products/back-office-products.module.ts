import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { BackOfficeProductsController } from './back-office-products.controller';

@Module({
  imports: [ProductsModule],
  controllers: [BackOfficeProductsController],
})
export class BackOfficeProductsModule {}
