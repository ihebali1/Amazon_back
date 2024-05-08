import { Client } from 'src/users/entities/users.entity';
import { IUsers } from 'src/users/interfaces/users.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IProductWishDetails } from '../interfaces/ProductWishDetails.interface';
import { IWishList } from '../interfaces/WishList.interface';
import { ProductWishDetails } from './ProductWishDetails.entity';

@Entity()
export class WishList implements IWishList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: 'default',
  })
  title: string;

  @OneToMany(
    () => ProductWishDetails,
    (productWishDetails) => productWishDetails.wishList,
  )
  productWishDetails: IProductWishDetails[] | string[];

  @ManyToOne(() => Client, (Client) => Client.wishLists)
  client: IUsers | string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
