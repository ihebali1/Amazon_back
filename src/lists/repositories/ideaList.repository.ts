import { EntityRepository, Repository } from 'typeorm';
import { IdeaList } from '../entities/IdeaList.entity';

@EntityRepository(IdeaList)
export class IdeaListRepository extends Repository<IdeaList> {}
