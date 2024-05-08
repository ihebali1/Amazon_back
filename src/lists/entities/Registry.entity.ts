import { Client } from 'src/users/entities/users.entity';
import { IUsers } from 'src/users/interfaces/users.interface';
import {
  ChildEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { IProductRegistryDetails } from '../interfaces/ProductRegistryDetails.interface';
import { IRegistry } from '../interfaces/Registry.interface';
import { ProductRegistryDetails } from './ProductRegistryDetails.entity';

@Entity()
@TableInheritance({ column: { type: 'nvarchar', name: 'kind' } })
export class Registry implements IRegistry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  address: string;

  @Column()
  Privacy: boolean;

  @OneToMany(
    () => ProductRegistryDetails,
    (productRegistryDetails) => productRegistryDetails.registry,
  )
  ProductRegistryDetailss: IProductRegistryDetails[] | string[];

  @ManyToOne(() => Client, (Client) => Client.registries)
  clients: IUsers | string;
}

@ChildEntity('Weeding')
export class Weeding extends Registry {
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  partnerFirstName: string;
  @Column()
  partnerLastName: string;
  @Column()
  giftNumber: number;
}

@ChildEntity('Baby')
export class Baby extends Registry {
  @Column()
  isFirstChild: boolean;
}

@ChildEntity('Holiday')
export class Holiday extends Registry {
  @Column()
  title: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  giftListName: string;
  @Column()
  state: string;
  @Column()
  isHidden: boolean;
}

@ChildEntity('Birthday')
export class Birthday extends Registry {
  @Column()
  title: string;
  @Column()
  gifterFirstName: string;
  @Column()
  gifterLastName: string;
  @Column()
  state: string;
}

@ChildEntity('Custom')
export class Custom extends Registry {
  @Column()
  title: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  giftListName: string;
  @Column()
  state: string;
}
