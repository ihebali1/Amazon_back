import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentPlatformEnum } from '../enums/payment-platform.enum';
import { IPaymentPlatform } from '../interfaces/payment-platform.interface';

@Entity()
export class PaymentPlatform implements IPaymentPlatform {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    nullable: true,
  })
  papalName: string;

  @Column({
    nullable: true,
  })
  papalNumber: number;

  @Column({
    nullable: true,
  })
  stripeName: string;

  @Column({
    nullable: true,
  })
  stripeNumber: number;

  @Column({
    nullable: true,
  })
  bankName: string;

  @Column({
    nullable: true,
  })
  bankNumber: number;

  @Column({
    type: 'enum',
    enum: PaymentPlatformEnum,
  })
  type: PaymentPlatformEnum;
}
