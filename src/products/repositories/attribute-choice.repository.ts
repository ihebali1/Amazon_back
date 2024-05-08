import { EntityRepository, Repository } from 'typeorm';
import { AttributeChoice } from '../entities/attribute-choice.entity';

@EntityRepository(AttributeChoice)
export class AttributeChoiceRepository extends Repository<AttributeChoice> {}
