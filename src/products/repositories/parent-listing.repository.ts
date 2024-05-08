import { OrderItem } from 'src/order-product/entities/orderItem.entity';
import { EntityRepository, Repository } from 'typeorm';
import { FindProductsDto } from '../dto/find-products-dto';
import { FindVendorProductsDto } from '../dto/find-vendor-products.dto';
import { ParentListing } from '../entities/product.entity';
import { ProductStatusEnum } from '../enums/product-status.enum';

@EntityRepository(ParentListing)
export class ParentListingRepository extends Repository<ParentListing> {
  async findProducts(findProductsFilter: FindProductsDto) {
    const query = this.createQueryBuilder('products')
      .leftJoinAndSelect('products.customBrand', 'customBrand')
      .leftJoinAndSelect('products.childCategory', 'childCategory')
      .leftJoinAndSelect('childCategory.parentCategories', 'parentCategories')
      .leftJoinAndSelect('parentCategories.departments', 'departments')
      .leftJoinAndSelect('products.variations', 'variations')
      .leftJoinAndSelect('products.primaryImage', 'primaryImage')
      .leftJoinAndSelect('products.vendor', 'vendor')
      .leftJoin('vendor.businessState', 'businessState')
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
    if (findProductsFilter.stateId) {
      query.andWhere('businessState.id = :id', {
        id: findProductsFilter.stateId,
      });
    }
    if (findProductsFilter.categoryId) {
      query.andWhere('childCategory.id = :id', {
        id: findProductsFilter.categoryId,
      });
    }

    if (findProductsFilter.brand) {
      query.andWhere('customBrand.id = :id', {
        id: findProductsFilter.brand,
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
    if (findProductsFilter.name) {
      query.andWhere('products.name like :name', {
        name: `%${findProductsFilter.name}%`,
      });
    }

    if (findProductsFilter.minPrice && findProductsFilter.maxPrice) {
      query.andWhere(
        'variations.price >= :minPrice AND variations.price <= :maxPrice',
        {
          minPrice: findProductsFilter.minPrice,
          maxPrice: findProductsFilter.maxPrice,
        },
      );
    }
    if (findProductsFilter.skip) {
      query.skip(findProductsFilter.skip);
    }
    if (findProductsFilter.take) {
      query.take(findProductsFilter.take);
    }

    return query.getManyAndCount();
  }

  async findProductsByBrand(productId: string, brandId: string) {
    return this.createQueryBuilder('products')
      .leftJoinAndSelect('products.vendor', 'vendor')
      .leftJoinAndSelect('products.variations', 'variations')
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

  async findVendorProducts(
    findVendorProductsFilter: FindVendorProductsDto,
    vendorId: string,
  ) {
    const query = this.createQueryBuilder('products')
      .leftJoinAndSelect('products.childCategory', 'childCategory')
      .leftJoinAndSelect('products.vendor', 'vendor')
      .leftJoinAndSelect('products.primaryImage', 'primaryImage')
      .leftJoinAndSelect('products.images', 'images')
      .leftJoinAndSelect('products.specifications', 'specifications')
      .leftJoinAndSelect('products.variationTheme', 'variationTheme')
      .leftJoinAndSelect('variationTheme.attributes', 'attributes')
      .leftJoinAndSelect('products.variations', 'variations')
      .leftJoinAndSelect(
        'variations.variationAttributeChoices',
        'variationAttributeChoices',
      )
      .leftJoinAndSelect(
        'variations.variationAttributeValues',
        'variationAttributeValues',
      )
      .leftJoinAndSelect('variationAttributeValues.attribute', 'valueAttribute')
      .leftJoinAndSelect(
        'variationAttributeChoices.attribute',
        'choiceAttribute',
      )
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

  async findProductsByDepartment(
    departmentId: string,
    status: ProductStatusEnum,
  ) {
    return this.createQueryBuilder('products')
      .leftJoinAndSelect('products.vendor', 'vendor')
      .leftJoinAndSelect('products.variations', 'variations')
      .leftJoinAndSelect('products.primaryImage', 'primaryImage')
      .leftJoin('products.childCategory', 'childCategory')
      .leftJoin('childCategory.parentCategories', 'parentCategories')
      .leftJoin('parentCategories.departments', 'departments')
      .where('departments.id = :departmentId', { departmentId: departmentId })
      .andWhere('products.status = :status', { status: status })
      .andWhere('products.isActive = :isActive', { isActive: true })
      .getMany();
  }

  /*async findHotNewArrival() {
    const query = this.createQueryBuilder('products')

      .leftJoinAndSelect('products.primaryImage', 'primaryImage')
      .leftJoinAndSelect('products.images', 'images')
      .leftJoinAndSelect('products.orderItems', 'orderItems')
      .loadRelationCountAndMap('products.itemCount', 'products.orderItems');

    return query.getMany();
  }*/

  async findHotNewArrival(findProductsFilter: FindProductsDto) {
    const query = this.createQueryBuilder('products')

      .leftJoinAndSelect('products.primaryImage', 'primaryImage')
      .leftJoinAndSelect('products.variations', 'variations')
      .leftJoinAndSelect('products.images', 'images')
      .leftJoinAndSelect('products.customBrand', 'customBrand')
      .leftJoinAndSelect('products.childCategory', 'childCategory')
      .leftJoinAndSelect('childCategory.parentCategories', 'parentCategories')
      .leftJoinAndSelect('parentCategories.departments', 'departments')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(c.id)', 'count')
          .from(OrderItem, 'c')
          .where('c.product.id = variations.id');
      }, 'count')
      .addOrderBy('count', 'DESC')
      .where('products.status = :status', {
        status: ProductStatusEnum.APPROVED,
      })
      .andWhere('products.isActive = :isActive', {
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
