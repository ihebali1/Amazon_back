import { Adress } from 'src/users/entities/adress.entity';
import { Vendor } from 'src/users/entities/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ICountry } from '../interfaces/country.interface';
import { State } from './state.entity';

@Entity()
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @OneToMany(() => Vendor, (vendor) => vendor.businessCountry)
  vendors: ICountry[] | string[];

  @OneToMany(() => State, (state) => state.country)
  states: State[] | string[];

  @OneToMany(() => Vendor, (vendor) => vendor.personalCountry)
  vendorsPersonalCountry: ICountry[] | string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
