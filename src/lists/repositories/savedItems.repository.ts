import { EntityRepository, Repository } from 'typeorm';
import { SavedItems } from '../entities/SavedItems.entity';

@EntityRepository(SavedItems)
export class SavedItemsRepository extends Repository<SavedItems> {}
