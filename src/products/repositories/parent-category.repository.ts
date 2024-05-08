import { EntityRepository, Repository } from 'typeorm';
import { ParentCategory } from '../entities/parent-category.entity';

@EntityRepository(ParentCategory)
export class ParentCategoryRepository extends Repository<ParentCategory> {
  async findWithoutDepartmentParents(departmentId: string) {
    return this.createQueryBuilder('parentCategory')
      .leftJoinAndSelect('parentCategory.departments', 'departments')
      .where('departments.id != :departmentId', { departmentId })
      .getMany();
  }
}
