import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { BackOfiiceChildCategoriesController } from './back-office-child-categories.controller';

@Module({
  imports: [ProductsModule],
  controllers: [BackOfiiceChildCategoriesController],
})
export class BackOfficeChildCategoriesModule {}
