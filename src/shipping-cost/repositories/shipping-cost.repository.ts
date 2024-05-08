import { EntityRepository, Repository } from 'typeorm';
import { ShippingCost } from '../entities/shipping-cost.entity';

@EntityRepository(ShippingCost)
export class ShippingCostRepository extends Repository<ShippingCost> {}
