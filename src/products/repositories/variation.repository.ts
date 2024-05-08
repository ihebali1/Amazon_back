import { EntityRepository, Repository } from 'typeorm';
import { Variation } from '../entities/product.entity';

@EntityRepository(Variation)
export class VariationRepository extends Repository<Variation> {}
