import { OrderItem } from 'src/order-product/entities/orderItem.entity';
import { EntityRepository, Repository } from 'typeorm';
import { BuyableProduct } from '../entities/product.entity';

@EntityRepository(BuyableProduct)
export class BuyableProductRepository extends Repository<BuyableProduct> {
  async findProductsWithCategoryDetails() {
    return this.createQueryBuilder('products')
      .leftJoinAndSelect('products.childCategory', 'childCategory')
      .getMany();
  }

  async findHotNewArrival() {
    const query = this.createQueryBuilder('products')

      .leftJoinAndSelect('products.primaryImage', 'primaryImage')
      .leftJoinAndSelect('products.images', 'images')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(c.id)', 'count')
          .from(OrderItem, 'c')
          .where('c.product.id = products.id');
      }, 'count')
      .addOrderBy('count', 'DESC');

    return query.getMany();
  }
}
