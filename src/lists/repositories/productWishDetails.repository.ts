import { EntityRepository, Repository } from 'typeorm';
import { ProductWishDetails } from '../entities/ProductWishDetails.entity';

@EntityRepository(ProductWishDetails)
export class ProductWishDetailsRepository extends Repository<ProductWishDetails> {}
