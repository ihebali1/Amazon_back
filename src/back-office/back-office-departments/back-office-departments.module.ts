import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { BackOfiiceDepartmentsController } from './back-office-departments.controller';

@Module({
  imports: [ProductsModule],
  controllers: [BackOfiiceDepartmentsController],
})
export class BackOfficeDepartmentsModule {}
