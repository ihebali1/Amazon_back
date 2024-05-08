import { EntityRepository, Repository } from 'typeorm';
import { Vendor } from '../entities/users.entity';

@EntityRepository(Vendor)
export class VendorRepository extends Repository<Vendor> {}
