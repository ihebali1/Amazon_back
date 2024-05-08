import { EntityRepository, Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';

@EntityRepository(Cart)
export class CartRepository extends Repository<Cart> {
  async findCartFullDetailsByClientId(clientId: string) {
    return this.createQueryBuilder('carts')
      .leftJoinAndSelect('carts.cartItems', 'cartItems')
      .leftJoinAndSelect('cartItems.product', 'product')
      .leftJoinAndSelect('product.dealProducts', 'dealProducts')
      .leftJoinAndSelect('dealProducts.deal', 'deal')
      .leftJoinAndSelect('product.parentListing', 'parentListing')
      .leftJoinAndSelect(
        'parentListing.primaryImage',
        'parentListingPrimaryImage',
      )
      .leftJoinAndSelect('product.vendor', 'vendor')
      .leftJoinAndSelect('vendor.businessState', 'businessState')
      .leftJoinAndSelect('parentListing.vendor', 'parentListingVendor')
      .leftJoinAndSelect(
        'parentListingVendor.businessState',
        'parentListingVendorBusinessState',
      )
      .leftJoinAndSelect('product.primaryImage', 'primaryImage')
      .leftJoin('carts.client', 'client')
      .where('client.id = :clientId', { clientId })
      .getOne();
  }
}
