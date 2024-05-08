import { EntityRepository, Repository } from 'typeorm';
import { PromotinalOffer } from '../entities/promotional-offer.entity';

@EntityRepository(PromotinalOffer)
export class PromotinalOfferRepository extends Repository<PromotinalOffer> {}
