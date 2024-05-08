import { Payment } from 'src/payment/entities/payment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GainEnum } from '../enums/gain.enum';

@Entity()
export class GainHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @OneToOne(() => Payment)
  @JoinColumn()
  payment: Payment;

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
