import { Client } from 'src/users/entities/users.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ICart } from '../interfaces/cart.interface';
import { CartItem } from './cartItem.entity';

@Entity()
export class Cart implements ICart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cartItems: CartItem[] | string[];

  @OneToOne(() => Client)
  @JoinColumn()
  client: Client | string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
