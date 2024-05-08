import { Payment } from 'src/payment/entities/payment.entity';

export interface IPayment_method {
  name: string;
  payments: Payment[] | string[];
}
