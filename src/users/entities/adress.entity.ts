import { State } from 'src/countries/entities/state.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUsers } from '../interfaces/users.interface';
import { Client } from './users.entity';

@Entity()
export class Adress {
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

  @ManyToOne(() => State, (state) => state.addresses)
  state: State | string;

  @Column()
  postalCode: string;

  @Column({
    default: false,
  })
  isDefault: boolean;

  @ManyToOne(() => Client, (client) => client.adresses)
  client: IUsers | string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
