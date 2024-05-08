import { EntityRepository, Repository } from 'typeorm';
import { ProductFeature } from '../entities/product-feature.entity';

@EntityRepository(ProductFeature)
export class ProductFeatureRepository extends Repository<ProductFeature> {}
