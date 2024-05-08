import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Promotions } from './promotional-offer.entity';

@Entity()
export class TierPromotions {
  [x: string]: any;
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column()
  discount: number;

  @ManyToOne(() => Promotions, (promotion) => promotion.tier)
  promotion: Promotions | string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
