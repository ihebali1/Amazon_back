import { Order } from 'src/order-product/entities/order.entity';
import { UserSubscription } from 'src/user-subscription/entities/user-subscription.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { PaymentTypeEnum } from '../enums/payment-type.enum';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  paid: boolean;

  @Column()
  paidAmount: number;

  @Column()
  feeAmount: number;

  @Column({
    type: 'enum',
    enum: PaymentTypeEnum,
    default: PaymentTypeEnum.STRIPE,
  })
  type: PaymentTypeEnum;

  @OneToOne(() => UserSubscription, (userSubscription) => userSubscription.paymentInfo) // specify inverse side as a second parameter
  userSubscription: UserSubscription;

  @OneToMany(() => Order, (order) => order.paymentInfo)
  orders: Order[] | string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
