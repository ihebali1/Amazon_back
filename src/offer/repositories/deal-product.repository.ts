import { ProductStatusEnum } from 'src/products/enums/product-status.enum';
import { EntityRepository, Repository } from 'typeorm';
import { FindDealsDto } from '../dto/find-deals.dto';
import { DealProduct } from '../entities/deal-product.entity';
import { DealsTypeEnum } from '../enums/deals-type.enum';

@EntityRepository(DealProduct)
export class DealProductRepository extends Repository<DealProduct> {
  async findActiveDealProducts(findDealsFilter: FindDealsDto) {
    const query = this.createQueryBuilder('dealProducts')
      .leftJoinAndSelect('dealProducts.deal', 'deal')
      .leftJoinAndSelect('dealProducts.product', 'product')
      .leftJoinAndSelect('product.customBrand', 'customBrand')
      .leftJoinAndSelect('product.parentListing', 'parentListing')
      .leftJoinAndSelect(
        'parentListing.primaryImage',
        'parentListingPrimaryImage',
      )
      .leftJoinAndSelect('product.primaryImage', 'primaryImage')
      .where('deal.endDate > :currentDate', {
        currentDate: new Date(),
      })
      .andWhere('deal.startDate < :currentDate', {
        currentDate: new Date(),
      })
      .andWhere('product.status = :status', {
        status: ProductStatusEnum.APPROVED,
      });
    if (findDealsFilter.type)
      query.andWhere('deal.dealType = :type', {
        type: findDealsFilter.type,
      });
    if (findDealsFilter.brand)
      query.andWhere('customBrand.id = :brand', {
        brand: findDealsFilter.brand,
      });

    return query.getMany();
  }

  async findProductActiveDeal(productId: string) {
    return this.createQueryBuilder('dealProducts')
      .leftJoinAndSelect('dealProducts.deal', 'deal')
      .leftJoinAndSelect('dealProducts.product', 'product')
      .where('deal.endDate > :currentDate', {
        currentDate: new Date(),
      })
      .andWhere('deal.startDate < :currentDate', {
        currentDate: new Date(),
      })
      .andWhere('product.status = :status', {
        status: ProductStatusEnum.APPROVED,
      })
      .andWhere('product.isActive = :isActive', {
        isActive: true,
      })
      .andWhere('product.id = :productId', {
        productId: productId,
      })
      .getOne();
  }
}
