import { EntityRepository, Repository } from 'typeorm';
import { WishList } from '../entities/WishList.entity';

@EntityRepository(WishList)
export class WishListRepository extends Repository<WishList> {
  async findClientWishLists(clientId: string) {
    return this.createQueryBuilder('wishlists')
      .leftJoinAndSelect('wishlists.productWishDetails', 'productWishDetails')
      .leftJoinAndSelect('productWishDetails.product', 'product')
      .leftJoinAndSelect('product.primaryImage', 'primaryImage')
      .leftJoinAndSelect('product.vendor', 'vendor')
      .leftJoinAndSelect('product.parentListing', 'parentListing')
      .leftJoinAndSelect(
        'parentListing.primaryImage',
        'parentListingPrimaryImage',
      )
      .leftJoinAndSelect('parentListing.vendor', 'parentListingVendor')
      .leftJoin('wishlists.client', 'client')
      .where('client.id = :clientId', { clientId })
      .orderBy('wishlists.createdAt', 'DESC')
      .getMany();
  }
}
