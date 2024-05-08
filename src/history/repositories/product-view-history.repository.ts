import { EntityRepository, Repository } from 'typeorm';
import { ProductViewHistory } from '../entities/history.entity';

@EntityRepository(ProductViewHistory)
export class ProductViewHistoryRepository extends Repository<ProductViewHistory> {}
