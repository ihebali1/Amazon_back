import { IUsers } from 'src/users/interfaces/users.interface';

export interface ICreditCard {
  cardNumber: number;
  user: IUsers | string;
}
