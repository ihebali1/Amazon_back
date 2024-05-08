import { FindTransporterOrdersDto } from 'src/transporter/dto/find-transporter-order.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/orderItem.entity';
import { OrderStatusEnum } from '../enums/order-staus.enum';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async findOrderById(orderId: string) {
    return this.createQueryBuilder('orders')
      .leftJoinAndSelect('orders.orderItems', 'orderItems')
      .leftJoinAndSelect('orders.report', 'report')
      .leftJoinAndSelect('orders.assignedTransporter', 'assignedTransporter')
      .leftJoinAndSelect('orders.paymentInfo', 'paymentInfo')

      .leftJoinAndSelect('report.messages', 'messages')
      .leftJoinAndSelect('messages.image', 'image')
      .leftJoinAndSelect('messages.video', 'video')
      .leftJoinAndSelect('messages.user', 'user')
      .leftJoinAndSelect('orders.shippingInfo', 'shippingInfo')
      .leftJoinAndSelect('shippingInfo.state', 'state')
      .leftJoinAndSelect('orderItems.product', 'product')
      .leftJoinAndSelect('product.vendor', 'vendor')
      .leftJoinAndSelect('product.primaryImage', 'primaryImage')
      .leftJoinAndSelect('product.parentListing', 'parentListing')
      .leftJoinAndSelect(
        'parentListing.primaryImage',
        'parentListingPrimaryImage',
      )

      .leftJoinAndSelect('parentListing.vendor', 'parentListingVendor')
      .where('orders.id = :orderId', { orderId })
      .getOne();
  }

  async findClientOrders(clientId: string) {
    return this.createQueryBuilder('orders')
      .leftJoinAndSelect('orders.orderItems', 'orderItems')
      .leftJoin('orders.client', 'client')
      .where('client.id = :clientId', { clientId })
      .orderBy('orders.createdAt', 'DESC')
      .getMany();
  }

  async findVendorOrderCountByStatus(
    vendorId: string,
    status: OrderStatusEnum,
    from: Date,
    to: Date,
  ) {
    return this.createQueryBuilder('orders')
      .leftJoin('orders.vendor', 'vendor')
      .where('vendor.id = :vendorId', { vendorId })
      .andWhere('orders.status LIKE :status', { status: status })
      .andWhere('orders.createdAt > :from', { from: from })
      .andWhere('orders.createdAt < :to', { to: to })
      .getCount();
  }

  async findVendorOrders(vendorId: string) {
    return this.createQueryBuilder('orders')
      .leftJoinAndSelect('orders.orderItems', 'orderItems')
      .leftJoin('orders.vendor', 'vendor')
      .loadRelationCountAndMap('orders.itemCount', 'orders.orderItems')
      .where('vendor.id = :vendorId', { vendorId })
      .orderBy('orders.createdAt', 'DESC')
      .getMany();
  }

  async findVendorOrder(orderId: string) {
    return this.createQueryBuilder('orders')
      .leftJoinAndSelect('orders.orderItems', 'orderItems')
      .leftJoinAndSelect('orders.report', 'report')
      .leftJoinAndSelect('report.messages', 'messages')
      .leftJoinAndSelect('orderItems.product', 'product')
      .leftJoinAndSelect('product.parentListing', 'parentListing')
      .leftJoinAndSelect('orders.client', 'client')
      .leftJoinAndSelect('orders.shippingInfo', 'shippingInfo')
      .leftJoinAndSelect('product.primaryImage', 'primaryImage')
      .leftJoin('orders.vendor', 'vendor')
      .where('orders.id = :orderId', { orderId })
      .getOne();
  }

  async findOrderByProduct(productId: string) {
    return this.createQueryBuilder('orders')
      .leftJoin('orders.orderItems', 'orderItems')
      .leftJoin('orderItems.product', 'product')
      .where('orderItems.product.id = :productId', { productId })
      .limit(50)
      .orderBy('orders.createdAt', "DESC")
      .getMany();
  }

  async findOrdersTransporter(
    transporterId: string,
    findTransporterOrdersDto: FindTransporterOrdersDto,
  ) {
    const query = this.createQueryBuilder('orders')
      .leftJoinAndSelect('orders.orderItems', 'orderItems')
      .leftJoinAndSelect('orders.vendorState', 'vendorState')
      .leftJoinAndSelect('orders.shippingInfo', 'shippingInfo')
      .leftJoinAndSelect('shippingInfo.state', 'shippingState')

      .leftJoin('orders.assignedTransporter', 'assignedTransporter')
      .where('assignedTransporter.id = :transporterId', { transporterId });
    if (findTransporterOrdersDto.status)
      query.andWhere('orders.status = :status', {
        status: findTransporterOrdersDto.status,
      });

    return query.orderBy('orders.createdAt', 'DESC').getMany();
  }

  async findTransporterOrder(transporterId: string, orderId: string) {
    const query = this.createQueryBuilder('orders')
      .leftJoinAndSelect('orders.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.product', 'product')
      .leftJoinAndSelect('product.parentListing', 'parentListing')
      .leftJoinAndSelect('orders.vendorState', 'vendorState')
      .leftJoinAndSelect('orders.shippingInfo', 'shippingInfo')
      .leftJoinAndSelect('shippingInfo.state', 'shippingState')

      .leftJoin('orders.assignedTransporter', 'assignedTransporter')
      .where('assignedTransporter.id = :transporterId', { transporterId })
      .andWhere('orders.id = :orderId', { orderId });

    return query.getOne();
  }
}
