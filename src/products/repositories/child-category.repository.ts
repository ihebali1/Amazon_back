import { EntityRepository, Repository } from 'typeorm';
import { ChildCategory } from '../entities/child-category.entity';

@EntityRepository(ChildCategory)
export class ChildCategoryRepository extends Repository<ChildCategory> {
  async findByDepartment(departmentId: string) {
    return this.createQueryBuilder('childCategory')
      .leftJoin('childCategory.parentCategories', 'parentCategories')
      .leftJoin('parentCategories.departments', 'departments')
      .where('departments.id = :id', { id: departmentId })
      .getMany();
  }

  async findByName(name: string) {
    return this.createQueryBuilder('childCategory')
      .where(
        'childCategory.name  LIKE :name OR childCategory.arName  LIKE :name',
        { name: `%${name}%` },
      )
      .getMany();
  }
}
