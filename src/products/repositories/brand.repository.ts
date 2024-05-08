import { EntityRepository, Repository } from 'typeorm';
import { Brand } from '../entities/brand.entity';

@EntityRepository(Brand)
export class BrandRepository extends Repository<Brand> {
    async findBrandByDepartment(departmentId: string) {
        return this.createQueryBuilder('brands')
            .leftJoinAndSelect('brands.image', 'image')
            .leftJoin('brands.products', 'products')
            .leftJoin('products.childCategory', 'childCategory')
            .leftJoin('childCategory.parentCategories', 'parentCategories')
            .leftJoin('parentCategories.departments', 'departments')
            .where('departments.id = :departmentId', { departmentId })
            .getMany();
    }
}
