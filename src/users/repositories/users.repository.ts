import { EntityRepository, Repository } from 'typeorm';
import { Users } from '../entities/users.entity';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  async findVendorContacts(vendorId: string) {
    return this.createQueryBuilder('users')
      .leftJoinAndSelect('users.sender', 'sender')
      .leftJoin('users.receiver', 'receiver')
      .where('receiver.id = :vendorId', { vendorId: vendorId })
      .distinct(true)
      .getMany();
  }
}
