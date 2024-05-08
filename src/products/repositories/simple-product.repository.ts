import { OrderItem } from 'src/order-product/entities/orderItem.entity';
import { EntityRepository, Repository } from 'typeorm';
import { FindProductsDto } from '../dto/find-products-dto';
import { FindVendorProductsDto } from '../dto/find-vendor-products.dto';
import { SimpleProduct } from '../entities/product.entity';
import { ProductStatusEnum } from '../enums/product-status.enum';

@EntityRepository(SimpleProduct)
export class SimpleProductRepository extends Repository<SimpleProduct> {
  async findProductsWithCategoryDetails() {
    return this.createQueryBuilder('products')
      .leftJoinAndSelect('products.childCategory', 'childCategory')
      .getMany();
  }

  async findProductsByDepartment(
    departmentId: string,
    status: ProductStatusEnum,
  ) {
    return this.createQueryBuilder('products')
      .leftJoinAndSelect('products.vendor', 'vendor')
      .leftJoinAndSelect('products.dealProducts', 'dealProducts')
      .leftJoinAndSelect('products.primaryImage', 'primaryImage')
      .leftJoinAndSelect('products.childCategory', 'childCategory')
      .leftJoinAndSelect('childCategory.parentCategories', 'parentCategories')
      .leftJoinAndSelect('parentCategories.departments', 'departments')
      .where('departments.id = :departmentId', { departmentId: departmentId })
      .andWhere('products.status = :status', { status: status })
      .andWhere('products.isActive = :isActive', { isActive: true })
      .getMany();
  }

  async findProductsByBrand(productId: string, brandId: string) {
    return this.createQueryBuilder('products')
      .leftJoinAndSelect('products.vendor', 'vendor')
      .leftJoinAndSelect('products.dealProducts', 'dealProducts')
      .leftJoinAndSelect('products.primaryImage', 'primaryImage')
      .leftJoinAndSelect('products.customBrand', 'customBrand')
      .where('customBrand.id = :brandId', { brandId: brandId })
      .andWhere('products.id <> :productId', { productId: productId })
      .andWhere('products.status = :status', {
        status: ProductStatusEnum.APPROVED,
      })
      .andWhere('products.isActive = :isActive', {
        isActive: true,
      })
      .limit(6)
      .getMany();
  }

  async findProducts(findProductsFilter: FindProductsDto) { 
    const query = this.createQueryBuilder('products')
      .leftJoinAndSelect('products.customBrand', 'customBrand')
      .leftJoinAndSelect('products.dealProducts', 'dealProducts')
      .leftJoinAndSelect('products.childCategory', 'childCategory')
      .leftJoinAndSelect('childCategory.parentCategories', 'parentCategories')
      .leftJoinAndSelect('parentCategories.departments', 'departments')
      .leftJoinAndSelect('products.vendor', 'vendor')
      .leftJoin('vendor.businessState', 'businessState')
      .leftJoinAndSelect('products.warnings', 'warnings')
      .leftJoinAndSelect('products.keyWords', 'keyWords')
      .leftJoinAndSelect('products.features', 'features')
      .leftJoinAndSelect('products.primaryImage', 'primaryImage')
      .leftJoinAndSelect('products.images', 'images')
      .leftJoinAndSelect('products.specifications', 'specifications');

    if (findProductsFilter.status)
      query.andWhere('products.status = :status', {
        status: findProductsFilter.status,
      });
    else query.where("products.status LIKE 'APPROVED' AND products.isActive = :isActive", {
      isActive: true,
    });

    if (findProductsFilter.vendor) {
      query.andWhere('vendor.id = :id', { id: findProductsFilter.vendor });
    }

    if (findProductsFilter.brand) {
      query.andWhere('customBrand.id = :id', {
        id: findProductsFilter.brand,
      });
    }
    if (findProductsFilter.categoryId) {
      query.andWhere('childCategory.id = :id', {
        id: findProductsFilter.categoryId,
      });
    }
    if (findProductsFilter.parentCategoryId) {
      query.andWhere('parentCategories.id = :id', {
        id: findProductsFilter.parentCategoryId,
      });
    }
    if (findProductsFilter.departmentId) {
      query.andWhere('departments.id = :id', {
        id: findProductsFilter.departmentId,
      });
    }
    if (findProductsFilter.skip) {
      query.skip(findProductsFilter.skip);
    }
    if (findProductsFilter.take) {
      query.take(findProductsFilter.take);
    }

    if (findProductsFilter.name) {
      query.andWhere('products.name like :name', {
        name: `%${findProductsFilter.name}%`,
      });
    }

    if (findProductsFilter.minPrice && findProductsFilter.maxPrice) {
      query.andWhere(
        'products.price >= :minPrice AND products.price <= :maxPrice',
        {
          minPrice: findProductsFilter.minPrice,
          maxPrice: findProductsFilter.maxPrice,
        },
      );
    }
    if (findProductsFilter.stateId) {
      query.andWhere('businessState.id = :id', {
        id: findProductsFilter.stateId,
      });
    }

    return query.getManyAndCount();
  }

  async findVendorProducts(
    findVendorProductsFilter: FindVendorProductsDto,
    vendorId: string,
  ) {
    const query = this.createQueryBuilder('products')
      .leftJoinAndSelect('products.warnings', 'warnings')
      .leftJoinAndSelect('products.keyWords', 'keyWords')
      .leftJoinAndSelect('products.features', 'features')
      .leftJoinAndSelect('products.attributeChoices', 'attributeChoices')
      .leftJoinAndSelect('products.attributeValues', 'attributeValues')
      .leftJoinAndSelect('attributeValues.attribute', 'valueAttribute')
      .leftJoinAndSelect('attributeChoices.attribute', 'choiceAttribute')
      .leftJoinAndSelect('products.primaryImage', 'primaryImage')
      .leftJoinAndSelect('products.images', 'images')
      .leftJoinAndSelect('products.vendor', 'vendor')
      .leftJoinAndSelect('products.specifications', 'specifications')
      .leftJoinAndSelect('products.childCategory', 'childCategory')
      .where('vendor.id = :id', { id: vendorId });

    if (findVendorProductsFilter.isApproved) {
      query.andWhere('products.isApproved = :isApproved', {
        isApproved: findVendorProductsFilter.isApproved,
      });
    }

    if (findVendorProductsFilter.status) {
      query.andWhere('products.status = :status', {
        status: findVendorProductsFilter.status,
      });
    }
    return query.getMany();
  }

  async findHotNewArrival(findProductsFilter: FindProductsDto) {
    const query = this.createQueryBuilder('products')

      .leftJoinAndSelect('products.primaryImage', 'primaryImage')
      .leftJoinAndSelect('products.images', 'images')
      .leftJoinAndSelect('products.customBrand', 'customBrand')
      .leftJoinAndSelect('products.childCategory', 'childCategory')
      .leftJoinAndSelect('childCategory.parentCategories', 'parentCategories')
      .leftJoinAndSelect('parentCategories.departments', 'departments')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(c.id)', 'count')
          .from(OrderItem, 'c')
          .where('c.product.id = products.id');
      }, 'count')
      .addOrderBy('count', 'DESC')
      .where('products.status = :status', {
        status: ProductStatusEnum.APPROVED,
      })
      .where('products.isActive = :isActive', {
        isActive: true,
      })
      .limit(12);
    if (findProductsFilter.departmentId) {
      query.andWhere('departments.id = :id', {
        id: findProductsFilter.departmentId,
      });
    }
    if (findProductsFilter.parentCategoryId) {
      query.andWhere('parentCategories.id = :id', {
        id: findProductsFilter.parentCategoryId,
      });
    }
    if (findProductsFilter.categoryId) {
      query.andWhere('childCategory.id = :id', {
        id: findProductsFilter.categoryId,
      });
    }
    if (findProductsFilter.brand) {
      query.andWhere('customBrand.id = :brand', {
        brand: findProductsFilter.brand,
      });
    }
    return query.getMany();
  }
}
