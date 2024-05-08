import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { BackOfficeVariationThemesController } from './back-office-variation-themes.controller';

@Module({
  imports: [ProductsModule],
  controllers: [BackOfficeVariationThemesController],
})
export class BackOfficeVariationThemesModule {}
