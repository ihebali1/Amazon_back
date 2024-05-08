import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GainEnum } from '../enums/gain.enum';
import { IGain } from '../interfaces/gain.interface';

@Entity()
export class Gain implements IGain {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  percentage: number;

  @Column({
    type: 'enum',
    enum: GainEnum,
  })
  type: GainEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
