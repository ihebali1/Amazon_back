import { EntityRepository, Repository } from 'typeorm';
import { Specification } from '../entities/specification.entity';

@EntityRepository(Specification)
export class SpecificationRepository extends Repository<Specification> {}
