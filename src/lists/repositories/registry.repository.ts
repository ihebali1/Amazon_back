import { EntityRepository, Repository } from 'typeorm';
import { Registry } from '../entities/Registry.entity';

@EntityRepository(Registry)
export class RegistryRepository extends Repository<Registry> {}
