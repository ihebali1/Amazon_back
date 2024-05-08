import { Module } from '@nestjs/common';
import { ShippingCostService } from './shipping-cost.service';
import { ShippingCostController } from './shipping-cost.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingCost } from './entities/shipping-cost.entity';
import { ShippingCostRepository } from './repositories/shipping-cost.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingCost, ShippingCostRepository])],
  controllers: [ShippingCostController],
  providers: [ShippingCostService],
})
export class ShippingCostModule {}
