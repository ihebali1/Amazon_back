import { EntityRepository, Repository } from 'typeorm';
import { FeaturedDepartment } from '../entities/featured-department.entity';

@EntityRepository(FeaturedDepartment)
export class FeaturedDepartmentRepository extends Repository<FeaturedDepartment> {}
