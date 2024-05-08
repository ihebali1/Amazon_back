import { EntityRepository, Repository } from 'typeorm';
import { ProductRegistryDetails } from '../entities/ProductRegistryDetails.entity';

@EntityRepository(ProductRegistryDetails)
export class ProductRegistryDetailsRepository extends Repository<ProductRegistryDetails> {}
