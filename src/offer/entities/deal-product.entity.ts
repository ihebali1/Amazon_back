import { OrderItem } from 'src/order-product/entities/orderItem.entity';
import { BuyableProduct } from 'src/products/entities/product.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Deals } from './promotional-offer.entity';

@Entity()
export class DealProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dealPrice: number;

  @ManyToOne(() => BuyableProduct, (product) => product.dealProducts)
  product: BuyableProduct | string;

  @ManyToOne(() => Deals, (deal) => deal.dealProducts)
  deal: Deals | string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.dealProduct)
  orderItems: OrderItem[] | string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
