import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { BackOfiiceAttributesController } from './back-office-attributes.controller';

@Module({
  imports: [ProductsModule],
  controllers: [BackOfiiceAttributesController],
})
export class BackOfficeAttributesModule {}
