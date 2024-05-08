import { IncomeNotification } from 'src/notification/entities/notification.entity';
import { Order } from 'src/order-product/entities/order.entity';
import { Vendor } from 'src/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IncomeStatusEnum } from '../enums/income-status.enum';

@Entity()
export class Income {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;

  @ManyToOne(() => Vendor, (vendor) => vendor.incomes)
  vendor: Vendor | string;

  @Column()
  amount: number;

  @OneToMany(() => IncomeNotification, (incomeNotification) => incomeNotification.income)
  notifications: IncomeNotification[]

  @Column({
    type: 'enum',
    enum: IncomeStatusEnum,
    default: IncomeStatusEnum.PENDING,
  })
  status: IncomeStatusEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
