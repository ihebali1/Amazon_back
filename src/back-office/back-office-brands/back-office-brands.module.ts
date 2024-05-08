import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { BackOfiiceBrandsController } from './back-office-brands.controller';

@Module({
  imports: [ProductsModule],
  controllers: [BackOfiiceBrandsController],
})
export class BackOfficeBrandsModule {}
