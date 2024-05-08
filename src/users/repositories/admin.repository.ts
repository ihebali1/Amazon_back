import { EntityRepository, Repository } from 'typeorm';
import { Admin } from '../entities/admin.entity';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
  async findAdminByEmailOrPhone(email: string, phone: string) {
    return this.createQueryBuilder('admins')
      .where('admins.email = :email', { email: email })
      .orWhere('admins.phone = :phone', { phone: phone })
      .getOne();
  }
}
