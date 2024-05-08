import { EntityRepository, Repository } from 'typeorm';
import { Department } from '../entities/department.entity';

@EntityRepository(Department)
export class DepartmentRepository extends Repository<Department> {
  async findToWeekDepartments() {
    // @TODO add week max purchases condition
    return this.createQueryBuilder('departments')
      .leftJoinAndSelect('departments.parentCategories', 'parentCategories')
      .leftJoinAndSelect('parentCategories.childCategories', 'childCategories')
      .limit(6)
      .getMany();
  }

  async findFeaturedDepartments() {
    // @TODO add week max purchases condition
    return this.createQueryBuilder('departments')
      .leftJoinAndSelect('departments.parentCategories', 'parentCategories')
      .leftJoinAndSelect('parentCategories.childCategories', 'childCategories')
      .leftJoinAndSelect('childCategories.products', 'products')
      .getMany();
  }
}
