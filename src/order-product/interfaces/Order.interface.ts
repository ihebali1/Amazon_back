import { Payment } from 'src/payment/entities/payment.entity';
import { IUsers } from 'src/users/interfaces/users.interface';
import { ILineItem } from './LineItem.interface';

export interface IOrder {
  totalPrice: number;

  lineItems: ILineItem[] | string[];

  payment: Payment | string;
}
