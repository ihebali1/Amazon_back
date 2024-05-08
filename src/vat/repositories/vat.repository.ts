import { EntityRepository, Repository } from 'typeorm';
import { Vat } from '../entities/vat.entity';

@EntityRepository(Vat)
export class VatRepository extends Repository<Vat> {}
