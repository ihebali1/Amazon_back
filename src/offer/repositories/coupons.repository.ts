import { EntityRepository, Repository } from 'typeorm';
import { Coupons } from '../entities/promotional-offer.entity';

@EntityRepository(Coupons)
export class CouponsRepository extends Repository<Coupons> {}
