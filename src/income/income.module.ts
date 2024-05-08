import { Module } from '@nestjs/common';
import { IncomeService } from './services/income.service';
import { IncomeController } from './controllers/income.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/order-product/entities/order.entity';
import { OrderRepository } from 'src/order-product/repositories/order.repository';
import { Income } from './entities/income.entity';
import { IncomeRepository } from './repositories/income.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Income,
      IncomeRepository,
      Order,
      OrderRepository,
    ]),
  ],
  controllers: [IncomeController],
  providers: [IncomeService],
})
export class IncomeModule {}
