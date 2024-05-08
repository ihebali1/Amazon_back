import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { VatTypeEnum } from '../enums/vat-type.enum';

@Entity()
export class Vat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  percentage: number;

  @Column({
    type: 'enum',
    enum: VatTypeEnum,
  })
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
