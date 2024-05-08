
import { BuyableProduct } from 'src/products/entities/product.entity';
import { Client } from 'src/users/entities/users.entity';
import { IUsers } from 'src/users/interfaces/users.interface';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IIdeaList } from '../interfaces/IdeaList.interface';

@Entity()
export class IdeaList implements IIdeaList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => Client, (Client) => Client.ideaLists)
  client: IUsers | string;

  @ManyToMany(() => BuyableProduct, (Product) => Product.ideaLists)
  @JoinTable()
  products: BuyableProduct[] | string[];
}
