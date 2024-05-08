import { Client } from 'src/users/entities/users.entity';

export interface ICart {
  id: string;

  client: Client | string;
}
