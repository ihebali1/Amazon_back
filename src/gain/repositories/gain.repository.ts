import { EntityRepository, Repository } from 'typeorm';
import { Gain } from '../entities/gain.entity';

@EntityRepository(Gain)
export class GainRepository extends Repository<Gain> {}
