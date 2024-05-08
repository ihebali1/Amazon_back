import { EntityRepository, Repository } from 'typeorm';
import { Promotions } from '../entities/promotional-offer.entity';

@EntityRepository(Promotions)
export class PromotionsRepository extends Repository<Promotions> {}
