import { EntityRepository, Repository } from 'typeorm';
import { Deals } from '../entities/promotional-offer.entity';

@EntityRepository(Deals)
export class DealsRepository extends Repository<Deals> {
  async findVendorDeals(vendorId: string) {
    return this.createQueryBuilder('deals')
      .leftJoinAndSelect('deals.dealProducts', 'dealProducts')
      .leftJoinAndSelect('dealProducts.product', 'product')
      .leftJoinAndSelect('product.primaryImage', 'primaryImage')
      .leftJoinAndSelect('product.parentListing', 'parentListing')
      .leftJoinAndSelect(
        'parentListing.primaryImage',
        'parentListingPrimaryImage',
      )
      .leftJoin('deals.vendor', 'vendor')
      .loadRelationCountAndMap('deals.numberProductDeal', 'deals.dealProducts')
      .where('vendor.id = :vendorId', { vendorId })
      .orderBy('deals.createdAt', 'DESC')
      .getMany();
  }

  async findDealFullDetails(dealId: string) {
    return this.createQueryBuilder('deals')
      .leftJoinAndSelect('deals.dealProducts', 'dealProducts')
      .leftJoinAndSelect('dealProducts.product', 'product')
      .leftJoin('deals.vendor', 'vendor')
      .loadRelationCountAndMap('deals.numberProductDeal', 'deals.dealProducts')
      .where('deals.id = :dealId', { dealId })
      .getOne();
  }
}
