import { EntityRepository, Repository } from 'typeorm';
import { Promotions } from '../entities/promotional-offer.entity';
import { TierPromotions } from '../entities/tier-promotions.entity';

@EntityRepository(TierPromotions)
export class TierPromotionsRepository extends Repository<TierPromotions> {}
