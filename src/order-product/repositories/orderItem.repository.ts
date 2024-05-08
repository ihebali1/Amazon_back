import { EntityRepository, Repository } from 'typeorm';
import { OrderItem } from '../entities/orderItem.entity';

@EntityRepository(OrderItem)
export class OrderItemRepository extends Repository<OrderItem> {
  async findOrderItemByProductAndCustomer(
    productId: string,
    cusomerId: string,
  ) {
    return this.createQueryBuilder('orderItems')
      .leftJoin('orderItems.product', 'product')
      .leftJoin('orderItems.order', 'order')
      .leftJoin('order.client', 'client')
      .where('client.id = :cusomerId', { cusomerId })
      .andWhere('product.id = :productId', { productId })
      .getMany();
  }
}
