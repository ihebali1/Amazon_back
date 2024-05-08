import { Payment } from 'src/payment/entities/payment.entity';
import { Client, Users } from 'src/users/entities/users.entity';
import { IUsers } from 'src/users/interfaces/users.interface';
import {
  ChildEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'nvarchar', name: 'kind' } })
export class PaymentMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}

@ChildEntity('AccountGiftCard')
export class AccountGiftCard extends PaymentMethod {
  @Column()
  balance: number;
}

@ChildEntity('CreditCard')
export class CreditCard extends PaymentMethod {
  @Column()
  last4: string;

  @Column()
  exp_month: string;

  @Column()
  exp_year: string;

  @Column()
  nameOnCard: string;

  @Column()
  brand: string;

  @Column()
  address_zip: string;

  @Column()
  stripeId: string;

  @ManyToOne(() => Client, (Client) => Client.creditCards)
  client: IUsers | string;
}

@ChildEntity('PersonalCheckingAccount')
export class PersonalCheckingAccount extends PaymentMethod {
  @Column()
  fullName: string;

  @Column()
  bankRoutingNumber: number;

  @Column()
  accountNumber: number;

  @Column()
  state: boolean;

  @ManyToOne(() => Client, (Client) => Client.personalCheckingAccounts)
  client: IUsers | string;
}

@ChildEntity('GiftCard')
export class GiftCard extends PaymentMethod {
  @Column()
  code: number;
}

@ChildEntity('StoreCard')
export class StoreCard extends PaymentMethod {}
