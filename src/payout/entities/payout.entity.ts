import { PayoutNotification } from 'src/notification/entities/notification.entity';
import { Vendor } from 'src/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PayoutStatusEnum } from '../enums/payout-status.enum';

@Entity()
export class Payout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  bankName: string;

  @Column()
  accountNumber: string;

  @Column()
  ibanNumber: string;

  @Column({
    nullable: true,
  })
  rejectMessage: string;

  @ManyToOne(() => Vendor, (vendor) => vendor.reports)
  createdBy: Vendor | string;

  @Column({
    type: 'enum',
    enum: PayoutStatusEnum,
    default: PayoutStatusEnum.PENDING,
  })
  status: string;

  @OneToMany(() => PayoutNotification, (notification) => notification.payout)
  notifications: PayoutNotification[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
