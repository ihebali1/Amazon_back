import { EntityRepository, Repository } from 'typeorm';
import { ProductWarning } from '../entities/product-warning.entity';

@EntityRepository(ProductWarning)
export class ProductWarningRepository extends Repository<ProductWarning> {}
