import { Transporter } from 'src/users/entities/users.entity';
import { EntityRepository, Repository } from 'typeorm';


@EntityRepository(Transporter)
export class TransporterRepository extends Repository<Transporter> {
  async findTransporterByEmailOrPhone(email: string, phone: string) {
    return this.createQueryBuilder('transporters')
      .where('transporters.email = :email', { email: email })
      .orWhere('transporters.phone = :phone', { phone: phone })
      .getOne();
  }
}
