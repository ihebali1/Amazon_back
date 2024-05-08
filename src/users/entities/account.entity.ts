import { Column } from 'typeorm';

export class Account {
  @Column()
  bankName: string;

  @Column()
  accountNumber: string;

  @Column()
  ibanNumber: string;

  @Column({
    default: 0,
  })
  availableBalance: number;

  @Column({
    default: 0,
  })
  pendingBalance: number;
}
