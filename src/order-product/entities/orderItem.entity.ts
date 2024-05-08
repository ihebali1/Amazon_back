import { DealProduct } from 'src/offer/entities/deal-product.entity';
import { BuyableProduct } from 'src/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @ManyToOne(() => BuyableProduct, (product) => product.orderItems)
  product: BuyableProduct | string;

  @ManyToOne(() => DealProduct, (dealProduct) => dealProduct.orderItems)
  dealProduct: DealProduct | string;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order | string;

  @Column()
  itemPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
