import { EntityRepository, Repository } from 'typeorm';
import { ManagementPack } from '../entities/management-pack.entity';

@EntityRepository(ManagementPack)
export class ManagementPackRepository extends Repository<ManagementPack> {}
