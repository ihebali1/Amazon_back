import { State } from 'src/countries/entities/state.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Shipping {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  streetAddress: string;

  @Column()
  aptNumber: string;

  @Column()
  city: string;

  @Column()
  postalCode: string;

  @ManyToOne(() => State, (state) => state.shippings)
  state: State | string;

  @OneToMany(() => Order, (order) => order.shippingInfo)
  orders: Order[] | string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
