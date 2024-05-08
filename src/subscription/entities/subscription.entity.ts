import { UserSubscription } from 'src/user-subscription/entities/user-subscription.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SubscriptionEnum } from '../enums/subscription.enum';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: number;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    type: 'enum',
    enum: SubscriptionEnum,
  })
  kind: SubscriptionEnum;

  @OneToMany(() => UserSubscription, (userSubscription) => userSubscription.subscription)
  userSubscriptions: UserSubscription[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
