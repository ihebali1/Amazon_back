import { EntityRepository, Repository } from 'typeorm';
import { Adress } from '../entities/adress.entity';

@EntityRepository(Adress)
export class AdressRepository extends Repository<Adress> {}
