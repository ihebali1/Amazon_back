import { EntityRepository, Repository } from 'typeorm';
import { ProductKeyWord } from '../entities/product-key-word.entity';

@EntityRepository(ProductKeyWord)
export class ProductKeyWordRepository extends Repository<ProductKeyWord> {}
