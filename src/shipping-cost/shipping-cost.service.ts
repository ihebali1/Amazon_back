import { Injectable } from '@nestjs/common';
import { UpdateShippingCostDto } from './dto/update-shipping-cost.dto';
import { ShippingCostRepository } from './repositories/shipping-cost.repository';

@Injectable()
export class ShippingCostService {
  constructor(private shippingCostRepository: ShippingCostRepository) {}
  findAll() {
    return this.shippingCostRepository.find();
  }

  async update(id: string, updateShippingCostDto: UpdateShippingCostDto) {
    const fetchedShippingCost = await this.shippingCostRepository.findOne(id);
    fetchedShippingCost.amount = updateShippingCostDto.amount;
    return this.shippingCostRepository.save(fetchedShippingCost);
  }
}
