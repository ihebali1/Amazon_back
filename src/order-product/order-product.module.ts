import { Module } from '@nestjs/common';
import { OrderProductService } from './services/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartRepository } from './repositories/cart.repository';
import { Cart } from './entities/cart.entity';
import { OrderController } from './controllers/order.controller';
import { Order } from './entities/order.entity';
import { CartController } from './controllers/cart.controller';
import { OrderRepository } from './repositories/order.repository';
import { CartService } from './services/cart.service';
import { CartItemRepository } from './repositories/cartItem.repository';
import { CartItem } from './entities/cartItem.entity';
import { PaymentRepository } from '../payment/repositories/payment.repository';
import { ClientRepository } from 'src/users/repositories/client.repository';
import { Client } from 'src/users/entities/users.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { Gain } from 'src/gain/entities/gain.entity';
import { GainHistory } from 'src/gain/entities/gain-history.entity';
import { GainRepository } from 'src/gain/repositories/gain.repository';
import { GainHistoryRepository } from 'src/gain/repositories/gain-history.repository';
import { Report } from 'src/report/entities/report.entity';
import { ReportRepository } from 'src/report/repositories/report.repository';
import { ReportOrderRepository } from 'src/report/repositories/report-order.repository';
import { OrderItem } from './entities/orderItem.entity';
import { OrderItemRepository } from './repositories/orderItem.repository';
import { ShippingCostRepository } from 'src/shipping-cost/repositories/shipping-cost.repository';
import { BuyableProductRepository } from 'src/products/repositories/buyable-product.repository';
import { UserSubscriptionModule } from 'src/user-subscription/user-subscription.module';
import { UserSubscriptionService } from 'src/user-subscription/user-subscription.service';
import { SubscriptionService } from 'src/subscription/services/subscription.service';
import { SubscriptionModule } from 'src/subscription/subscription.module';
import { BuyableProduct } from 'src/products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CartRepository,
      Cart,
      BuyableProduct,
      BuyableProductRepository,
      Order,
      OrderRepository,
      CartItemRepository,
      CartItem,
      ClientRepository,
      Client,
      Gain,
      GainHistory,
      GainRepository,
      GainHistoryRepository,
      Payment,
      PaymentRepository,
      Report,
      ReportRepository,
      ReportOrderRepository,
      OrderItem,
      OrderItemRepository,
      ShippingCostRepository,
    ]),
    UserSubscriptionModule,
    SubscriptionModule,
  ],
  controllers: [OrderController, CartController],
  providers: [OrderProductService, CartService, UserSubscriptionService, SubscriptionService],
  exports: [OrderProductService],
})
export class OrderProductModule {}
