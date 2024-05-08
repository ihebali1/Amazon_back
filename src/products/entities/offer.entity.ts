import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IOffer } from '../interfaces/offer.interface';

@Entity()
export class Offer implements IOffer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  suggestedPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
