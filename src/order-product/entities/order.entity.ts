import { State } from 'src/countries/entities/state.entity';
import { Income } from 'src/income/entities/income.entity';
import { OrderNotification } from 'src/notification/entities/notification.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { ReportOrder } from 'src/report/entities/report.entity';
import { Client, Transporter, Vendor } from 'src/users/entities/users.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStatusEnum } from '../enums/order-staus.enum';
import { OrderItem } from './orderItem.entity';
import { Shipping } from './shipping.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    //unique: true,
    nullable: true,
  })
  orderId: string;

  @Column({
    nullable: true,
  })
  totalPrice: number;

  @OneToOne(() => Income)
  income: Income;

  @Column()
  platformGainPercentage: number;

  @Column({
    type: 'enum',
    enum: OrderStatusEnum,
    default: OrderStatusEnum.PENDING,
  })
  status: OrderStatusEnum;

  @Column({})
  shippingAmount: number;

  @ManyToOne(() => Transporter, (transporter) => transporter.order)
  assignedTransporter: Transporter | string;

  @ManyToOne(() => Client, (client) => client.orders)
  client: Client | string;

  @ManyToOne(() => Vendor, (vendor) => vendor.orders)
  vendor: Vendor | string;

  @ManyToOne(() => State, (state) => state.orders)
  vendorState: State | string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @ManyToOne(() => Payment, (payment) => payment.orders)
  paymentInfo: Payment | string;

  @ManyToOne(() => Shipping, (shipping) => shipping.orders)
  shippingInfo: Shipping | string;

  @OneToOne(() => ReportOrder, (report) => report.order)
  report: ReportOrder;

  @OneToMany(() => OrderNotification, (orderNotification) => orderNotification.order)
  notifications: OrderNotification[]

  @Column({
    nullable: true,
  })
  orderedAt: Date;

  @Column({
    nullable: true,
  })
  deliveredAt: Date;

  @Column({
    nullable: true,
  })
  canceledAt: Date;

  @Column({
    nullable: true,
  })
  deliveryStartedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  generateRandomId() {
    const id = parseInt(Date.now() + Math.random().toString());
    this.orderId = id.toString();
  }
}
