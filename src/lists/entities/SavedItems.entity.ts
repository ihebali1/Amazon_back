import { BuyableProduct } from 'src/products/entities/product.entity';
import { Client } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ISavedItems } from '../interfaces/SavedItems.interface';

@Entity()
export class SavedItems implements ISavedItems {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  clientId: string;

  @OneToOne(() => Client)
  client: Client;

  @ManyToMany(() => BuyableProduct, (Product) => Product.savedItemss)
  @JoinTable()
  products: BuyableProduct[] | string;
}
