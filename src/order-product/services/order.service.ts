import {
  BadRequestException,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { GainHistory } from 'src/gain/entities/gain-history.entity';
import { GainEnum } from 'src/gain/enums/gain.enum';
import { GainRepository } from 'src/gain/repositories/gain.repository';
import { Payment } from 'src/payment/entities/payment.entity';
import { PaymentTypeEnum } from 'src/payment/enums/payment-type.enum';
import { STRIPE_CLIENT } from 'src/stripe/constants';
import { Client, Vendor } from 'src/users/entities/users.entity';
import { ClientRepository } from 'src/users/repositories/client.repository';
import Stripe from 'stripe';
import { CartItem } from '../entities/cartItem.entity';
import { Order } from '../entities/order.entity';
import { OrderStatusEnum } from '../enums/order-staus.enum';
import { CartRepository } from '../repositories/cart.repository';
import { OrderRepository } from '../repositories/order.repository';
import { getConnection } from 'typeorm';
import { Shipping } from '../entities/shipping.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateShippingStatusDto } from '../dto/update-shipping-status.dto';
import { Income } from 'src/income/entities/income.entity';
import { OrderItem } from '../entities/orderItem.entity';
import { State } from 'src/countries/entities/state.entity';
import { ShippingCostTypeEnum } from 'src/shipping-cost/enums/shipping-cost-type.enum';
import { ShippingCostRepository } from 'src/shipping-cost/repositories/shipping-cost.repository';
import { CartItemRepository } from '../repositories/cartItem.repository';
import { ProductStatusEnum } from 'src/products/enums/product-status.enum';
import { DealProduct } from 'src/offer/entities/deal-product.entity';
import { Deals } from 'src/offer/entities/promotional-offer.entity';
import { UpdateOrderTransporterDto } from '../dto/update-order-transporter.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from 'src/notification/events/order-created.event';
import { NotificationTypeEnum } from 'src/notification/enums/notification-type.enum';
import { NotificationTargetEnum } from 'src/notification/enums/notification-target.enum';
import { OrderStatusUpdatedEvent } from 'src/notification/events/order-status-updated.event';
import { Adress } from 'src/users/entities/adress.entity';
import { UserSubscriptionService } from 'src/user-subscription/user-subscription.service';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { SubscriptionEnum } from 'src/subscription/enums/subscription.enum';
import { SubscriptionService } from 'src/subscription/services/subscription.service';
import {
  BuyableProduct,
  SimpleProduct,
  Variation,
  ParentListing,
} from 'src/products/entities/product.entity';
import { ShippingStatusEnum } from '../enums/shipping-status.enum';

@Injectable()
export class OrderProductService {
  constructor(
    @Inject(STRIPE_CLIENT) private stripe: Stripe,
    private cartRepository: CartRepository,
    private orderRepository: OrderRepository,
    private clientRepository: ClientRepository,
    private gainRepository: GainRepository,
    private cartItemRepository: CartItemRepository,
    private shippingCostRepository: ShippingCostRepository,
    private userSubscriptionService: UserSubscriptionService,
    private subscriptionService: SubscriptionService,
    private eventEmitter: EventEmitter2,
  ) {}
  async create(clientId: string, createOrderDto: CreateOrderDto) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();

    // lets now open a new transaction:
    await queryRunner.startTransaction();

    try {
      // execute some operations on this transaction:
      const client = await this.clientRepository.findOne(clientId);
      const cart = await this.cartRepository.findCartFullDetailsByClientId(
        clientId,
      );
      if (!cart) throw new NotFoundException('user cart not found');
      const cartItems = cart.cartItems as CartItem[];
      let totalPrice = 0;
      const gain = await this.gainRepository.findOne({
        type: GainEnum.TRANSACTION,
      });
      const sameStateShippingCost = await this.shippingCostRepository.findOne({
        type: ShippingCostTypeEnum.SAME_ZONE,
      });
      const differentStateShippingCost =
        await this.shippingCostRepository.findOne({
          type: ShippingCostTypeEnum.DIFFERENT_ZONE,
        });

      // save shipping info
      const shipping = new Shipping();
      shipping.firstName = createOrderDto.firstName;
      shipping.lastName = createOrderDto.lastName;
      shipping.streetAddress = createOrderDto.streetAddress;
      shipping.aptNumber = createOrderDto.aptNumber;
      shipping.city = createOrderDto.city;
      shipping.postalCode = createOrderDto.postalCode;
      shipping.state = createOrderDto.state;
      const createdShipping = await queryRunner.manager.save(shipping);

      const orders: Order[] = [];

      // create an order for each vendor
      for (const cartItem of cartItems) {
        const product = cartItem.product as BuyableProduct;
        if (product.quantity < cartItem.quantity) {
          await this.cartItemRepository.remove(cartItem);
          throw new NotAcceptableException(
            `المنتج ${product.id} غير متوفر ، ستتم إزالته من سلة التسوق الخاصة بك`,
          );
        }
        //@TODO change id with product name in the exception
        if (product.vendor) {
          if ((product as SimpleProduct).status != ProductStatusEnum.APPROVED) {
            await this.cartItemRepository.remove(cartItem);
            throw new NotAcceptableException(
              `المنتج ${product.id} غير متوفر ، ستتم إزالته من سلة التسوق الخاصة بك`,
            );
          }
          if ((product as SimpleProduct).isActive == false) {
            await this.cartItemRepository.remove(cartItem);
            throw new NotAcceptableException(
              `المنتج ${product.id} غير متوفر ، ستتم إزالته من سلة التسوق الخاصة بك`,
            );
          }
        }

        if (product.vendor == null) {
          if (
            ((product as Variation).parentListing as ParentListing).status !=
            ProductStatusEnum.APPROVED
          ) {
            await this.cartItemRepository.remove(cartItem);
            throw new NotAcceptableException(
              `المنتج ${product.id} غير متوفر ، ستتم إزالته من سلة التسوق الخاصة بك`,
            );
          }
          if (
            ((product as Variation).parentListing as ParentListing).isActive ==
            false
          ) {
            await this.cartItemRepository.remove(cartItem);
            throw new NotAcceptableException(
              `المنتج ${product.id} غير متوفر ، ستتم إزالته من سلة التسوق الخاصة بك`,
            );
          }
        }
        let productPrice = product.price;
        let productActiveDeal = null;
        //@TODO() refactor use dealService instead
        for (const dealProduct of product.dealProducts as DealProduct[]) {
          if (
            (dealProduct.deal as Deals).startDate <= new Date() &&
            (dealProduct.deal as Deals).endDate >= new Date()
          ) {
            productPrice = dealProduct.dealPrice;
            productActiveDeal = dealProduct;
            break;
          }
        }
        let isFound = false;
        for (const order of orders) {
          if ((cartItem.product as BuyableProduct).vendor != null) {
            if (
              (order.vendor as string) ==
              (((cartItem.product as BuyableProduct).vendor as Vendor)
                .id as string)
            ) {
              isFound = true;
              const orderItem = new OrderItem();
              orderItem.itemPrice = productPrice;
              if (productActiveDeal) orderItem.dealProduct = productActiveDeal;
              orderItem.quantity = cartItem.quantity;
              orderItem.product = cartItem.product;
              orderItem.order = order.id;
              order.totalPrice += orderItem.itemPrice * orderItem.quantity;
              await queryRunner.manager.save(orderItem);
            }
          }
          if ((cartItem.product as BuyableProduct).vendor == null) {
            if (
              (order.vendor as string) ==
              ((
                ((cartItem.product as Variation).parentListing as ParentListing)
                  .vendor as Vendor
              ).id as string)
            ) {
              isFound = true;
              const orderItem = new OrderItem();
              orderItem.itemPrice = productPrice;
              if (productActiveDeal) orderItem.dealProduct = productActiveDeal;
              orderItem.quantity = cartItem.quantity;
              orderItem.product = cartItem.product;
              orderItem.order = order.id;
              order.totalPrice += orderItem.itemPrice * orderItem.quantity;
              await queryRunner.manager.save(orderItem);
              const product = orderItem.product as BuyableProduct;
              await queryRunner.manager.update(BuyableProduct, product.id, {
                quantity: product.quantity - orderItem.quantity,
              });
            }
          }
        }

        if (
          isFound == false &&
          (cartItem.product as BuyableProduct).vendor == null
        ) {
          const order = new Order();
          order.platformGainPercentage = gain.percentage;
          order.client = clientId;
          order.vendor = (
            ((cartItem.product as Variation).parentListing as ParentListing)
              .vendor as Vendor
          ).id as string;

          const vendorState = (
            ((cartItem.product as Variation).parentListing as ParentListing)
              .vendor as Vendor
          ).businessState as State;
          if (vendorState.id == createOrderDto.state)
            order.shippingAmount = sameStateShippingCost.amount;
          else order.shippingAmount = differentStateShippingCost.amount;

          order.totalPrice = productPrice * cartItem.quantity;
          const createdOrder = await queryRunner.manager.save(order);
          orders.push(order);

          const orderItem = new OrderItem();
          orderItem.itemPrice = productPrice;
          if (productActiveDeal) orderItem.dealProduct = productActiveDeal;
          orderItem.quantity = cartItem.quantity;
          orderItem.product = cartItem.product;
          orderItem.order = createdOrder.id;
          await queryRunner.manager.save(orderItem);
          const product = orderItem.product as BuyableProduct;
          await queryRunner.manager.update(BuyableProduct, product.id, {
            quantity: product.quantity - orderItem.quantity,
          });
        }

        if (
          isFound == false &&
          (cartItem.product as BuyableProduct).vendor != null
        ) {
          const order = new Order();
          order.platformGainPercentage = gain.percentage;
          order.client = clientId;
          order.vendor = (
            (cartItem.product as BuyableProduct).vendor as Vendor
          ).id;

          const vendorState = (
            (cartItem.product as BuyableProduct).vendor as Vendor
          ).businessState as State;
          if (vendorState.id == createOrderDto.state)
            order.shippingAmount = sameStateShippingCost.amount;
          else order.shippingAmount = differentStateShippingCost.amount;

          order.totalPrice = productPrice * cartItem.quantity;
          const createdOrder = await queryRunner.manager.save(order);

          orders.push(order);

          const orderItem = new OrderItem();
          orderItem.itemPrice = productPrice;
          if (productActiveDeal) orderItem.dealProduct = productActiveDeal;
          orderItem.quantity = cartItem.quantity;
          orderItem.product = cartItem.product;
          orderItem.order = createdOrder.id;
          await queryRunner.manager.save(orderItem);
          const product = orderItem.product as BuyableProduct;
          await queryRunner.manager.update(BuyableProduct, product.id, {
            quantity: product.quantity - orderItem.quantity,
          });
        }
      }
      let platformGain = 0;
      // Save orders && vendor's income
      for (const order of orders) {
        order.status = OrderStatusEnum.ORDERED;
        order.shippingInfo = createdShipping;
        totalPrice += order.shippingAmount + order.totalPrice;
        await queryRunner.manager.save(order);

        //@TODO calculate income on each orderItem - URGENT FIX-
        const income = new Income();
        const userActiveSubscription =
          await this.userSubscriptionService.findUserActiveSubscription(
            order.vendor as string,
          );
        console.log(userActiveSubscription);
        if (
          (userActiveSubscription.subscription as Subscription).kind ==
          SubscriptionEnum.INDIVIDUAL
        ) {
          income.amount =
            order.totalPrice -
            (userActiveSubscription.subscription as Subscription).price;
          platformGain += (userActiveSubscription.subscription as Subscription)
            .price;
        }
        if (
          (userActiveSubscription.subscription as Subscription).kind ==
          SubscriptionEnum.PROFESSIONAL
        ) {
          income.amount = order.totalPrice;
        }

        income.vendor = order.vendor as Vendor;
        income.order = order;
        await queryRunner.manager.save(income);
      }

      // Store payment info
      const paymentInfo = new Payment();
      paymentInfo.paidAmount = totalPrice;
      paymentInfo.feeAmount = 0;
      paymentInfo.orders = orders;
      paymentInfo.paid = true;
      paymentInfo.type = PaymentTypeEnum.STRIPE;
      await queryRunner.manager.save(paymentInfo);

      // Store platform gain amount
      const gainHistory = new GainHistory();
      gainHistory.payment = paymentInfo;
      gainHistory.type = gain.type;
      gainHistory.amount = platformGain;
      await queryRunner.manager.save(gainHistory);

      cart.cartItems = [];
      await queryRunner.manager.save(cart);

      // Process payment
      try {
        const source = await this.stripe.customers.createSource(
          client.stripeId,
          {
            source: createOrderDto.cardToken,
          },
        );
        await this.stripe.charges.create({
          amount: totalPrice * 100,
          currency: 'usd',
          source: source.id,
          customer: client.stripeId,
        });
      } catch (error) {
        throw new BadRequestException(error);
      }

      //Optionally save user's address
      if (
        createOrderDto.saveAddress != null &&
        createOrderDto.saveAddress == true
      ) {
        const address = new Adress();
        address.aptNumber = createOrderDto.aptNumber;
        address.streetAddress = createOrderDto.streetAddress;
        address.firstName = createOrderDto.firstName;
        address.lastName = createOrderDto.lastName;
        address.postalCode = createOrderDto.postalCode;
        address.city = createOrderDto.city;
        address.state = createOrderDto.state;
        address.client = clientId;
        await queryRunner.manager.save(Adress, address);
      }

      // commit transaction now:
      await queryRunner.commitTransaction();

      //Notify users
      for (const order of orders) {
        this.eventEmitter.emit('order.created', {
          order: order.id,
          target: NotificationTargetEnum.USER,
          type: NotificationTypeEnum.ORDER,
          userIds: [client.id, (order.vendor as Vendor).id],
        } as OrderCreatedEvent);
      }
    } catch (err) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(err);
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
  }

  findAll() {
    return this.orderRepository.find();
  }

  findAllByClient(clientId: string) {
    return this.orderRepository.findClientOrders(clientId);
  }

  findAllByVendor(vendorId: string) {
    return this.orderRepository.findVendorOrders(vendorId);
  }

  findOne(id: string) {
    return this.orderRepository.findOrderById(id);
  }

  findVendorOrder(id: string) {
    return this.orderRepository.findVendorOrder(id);
  }

  async updateShippingStatus(
    id: string,
    updateShippingStatusDto: UpdateShippingStatusDto,
  ) {
    const fetchedOrder = await this.orderRepository.findOne(id, {
      relations: ['client', 'vendor', 'assignedTransporter'],
    });
    if (!fetchedOrder) throw new NotFoundException('order not found');
    // @TODO add status workflow check && DTO
    fetchedOrder.status =
      updateShippingStatusDto.status as unknown as OrderStatusEnum;
    await this.orderRepository.save(fetchedOrder);

    this.eventEmitter.emit('order.status.updated', {
      order: fetchedOrder.id,
      status: fetchedOrder.status,
      target: NotificationTargetEnum.USER,
      userIds: [
        (fetchedOrder.client as Client).id,
        (fetchedOrder.vendor as Vendor).id,
      ],
    } as OrderStatusUpdatedEvent);
  }

  async updateOrderShippingStatus(id: string, status: OrderStatusEnum) {
    const fetchedOrder = await this.orderRepository.findOne(id, {
      relations: ['client', 'vendor', 'assignedTransporter'],
    });
    if (!fetchedOrder) throw new NotFoundException('order not found');
    // @TODO add status workflow check && DTO
    fetchedOrder.status = status as OrderStatusEnum;
    await this.orderRepository.save(fetchedOrder);

    this.eventEmitter.emit('order.status.updated', {
      order: fetchedOrder.id,
      status: fetchedOrder.status,
      type: NotificationTypeEnum.ORDER,
      target: NotificationTargetEnum.USER,
      userIds: [
        (fetchedOrder.client as Client).id,
        (fetchedOrder.vendor as Vendor).id,
      ],
    } as OrderStatusUpdatedEvent);
  }

  deliverOrder = async (id: string) => {
    const fetchedOrder = await this.orderRepository.findOne(id);
    fetchedOrder.status = OrderStatusEnum.DELIVERED;
    return this.orderRepository.save(fetchedOrder);
  };

  async setOrderTransporter(
    id: string,
    updateOrderTransporterDto: UpdateOrderTransporterDto,
  ) {
    const fetchedOrder = await this.orderRepository.findOne(id, {
      relations: ['client', 'vendor', 'assignedTransporter'],
    });

    if (!fetchedOrder) throw new NotFoundException('order not found');
    if (fetchedOrder.assignedTransporter)
      throw new NotFoundException('transporter already assigned');
    // @TODO add status workflow check && DTO
    fetchedOrder.assignedTransporter = updateOrderTransporterDto.transporter;
    await this.orderRepository.save(fetchedOrder);

    this.eventEmitter.emit('order.status.updated', {
      order: fetchedOrder.id,
      status: fetchedOrder.status,
      type: NotificationTypeEnum.ORDER,
      target: NotificationTargetEnum.USER,
      userIds: [
        updateOrderTransporterDto.transporter,
        (fetchedOrder.vendor as Vendor).id,
      ],
    } as OrderStatusUpdatedEvent);
  }

  async getVendorOrderStatistics(vendorId: string) {
    const date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    const firstDayOfMonth = new Date(y, m, 1);

    const preparedOrderCount =
      await this.orderRepository.findVendorOrderCountByStatus(
        vendorId,
        OrderStatusEnum.PREPARED,
        firstDayOfMonth,
        date,
      );
    const newOrderCount =
      await this.orderRepository.findVendorOrderCountByStatus(
        vendorId,
        OrderStatusEnum.ORDERED,
        firstDayOfMonth,
        date,
      );
    const indeliveryOrderCount =
      await this.orderRepository.findVendorOrderCountByStatus(
        vendorId,
        OrderStatusEnum.INDELIVERY,
        firstDayOfMonth,
        date,
      );
    const deliveredOrderCount =
      await this.orderRepository.findVendorOrderCountByStatus(
        vendorId,
        OrderStatusEnum.DELIVERED,
        firstDayOfMonth,
        date,
      );
    const canceledOrderCount =
      await this.orderRepository.findVendorOrderCountByStatus(
        vendorId,
        OrderStatusEnum.CANCELED,
        firstDayOfMonth,
        date,
      );

    return {
      preparedOrderCount,
      newOrderCount,
      indeliveryOrderCount,
      deliveredOrderCount,
      canceledOrderCount,
    };
  }

  findOrderByProduct = async (productId: string) => {
    try {
      const productList: IProductCount[] = [];
      const fetchedOrders = await this.orderRepository.findOrderByProduct(
        productId,
      );
      console.log(fetchedOrders);
      for (const order of fetchedOrders) {
        const fetchedOrder = await this.orderRepository.findOne(order.id, {
          relations: [
            'orderItems',
            'orderItems.product',
            'orderItems.product.primaryImage',
            'orderItems.product.parentListing',
            'orderItems.product.parentListing.primaryImage',
          ],
        });
        fetchedOrder.orderItems = fetchedOrder.orderItems.filter(
          (item) => (item.product as BuyableProduct).id != productId,
        );
        for (const orderItem of fetchedOrder.orderItems) {
          let exist = false;

          for (const productItem of productList) {
            if (
              productItem.product.id == (orderItem.product as BuyableProduct).id
            ) {
              productItem.count++;
              exist = true;
              break;
            }
          }
          if (exist == false)
            productList.push({
              product: orderItem.product as BuyableProduct,
              count: 1,
            });
        }
      }
      return productList
        .sort((a, b) => a.count + b.count)
        .slice(0, 2)
        .map((item) => item.product);
    } catch (error) {
      console.log(error);
    }
  };
}

export interface IProductCount {
  product: BuyableProduct;
  count: number;
}
