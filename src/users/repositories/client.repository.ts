import { EntityRepository, Repository } from 'typeorm';
import { Client } from '../entities/users.entity';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {
  async findClientFullDetails(clientId: string) {
    return this.createQueryBuilder('clients')
      .leftJoinAndSelect('clients.adresses', 'adresses')
      .leftJoinAndSelect('clients.creditCards', 'creditCards')
      .where('clients.id = :id', { id: clientId })
      .getOne();
  }
}
