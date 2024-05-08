import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { BackOfiiceParentCategoriesController } from './back-office-parent-categories.controller';

@Module({
  imports: [ProductsModule],
  controllers: [BackOfiiceParentCategoriesController],
})
export class BackOfficeParentCategoriesModule {}
