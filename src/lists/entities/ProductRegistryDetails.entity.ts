import { BuyableProduct } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IProductRegistryDetails } from '../interfaces/ProductRegistryDetails.interface';
import { IRegistry } from '../interfaces/Registry.interface';
import { Registry } from './Registry.entity';

@Entity()
export class ProductRegistryDetails implements IProductRegistryDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  comment: string;

  @Column()
  quantity: number;

  @Column()
  isMostWanted: boolean;

  @ManyToOne(() => BuyableProduct, (product) => product.ProductRegistryDetailss)
  product: BuyableProduct | string;

  @ManyToOne(() => Registry, (registry) => registry.ProductRegistryDetailss)
  registry: IRegistry | string;
}
