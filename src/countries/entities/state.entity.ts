import { Order } from 'src/order-product/entities/order.entity';
import { Shipping } from 'src/order-product/entities/shipping.entity';
import { Adress } from 'src/users/entities/adress.entity';
import { Vendor } from 'src/users/entities/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Country } from './country.entity';

@Entity()
export class State {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Shipping, (shipping) => shipping.state)
  shippings: Shipping[] | string[];

  @OneToMany(() => Order, (order) => order.vendorState)
  orders: Order[] | string[];

  @ManyToOne(() => Country, (country) => country.states)
  country: Country | string;
  
  @OneToMany(() => Adress, (address) => address.state)
  addresses: Adress[] | string[];

  @OneToMany(() => Vendor, (vendor) => vendor.businessState)
  vendors: Vendor[] | string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
