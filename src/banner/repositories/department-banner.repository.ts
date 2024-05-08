import { EntityRepository, Repository } from 'typeorm';
import { DepartmentBanner } from '../entities/banner.entity';

@EntityRepository(DepartmentBanner)
export class DepartmentBannerRepository extends Repository<DepartmentBanner> {}
