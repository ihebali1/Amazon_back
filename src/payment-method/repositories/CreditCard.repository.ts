import { EntityRepository, Repository } from 'typeorm';
import { CreditCard } from '../entities/payment-method.entity';

@EntityRepository(CreditCard)
export class CreditCardRepository extends Repository<CreditCard> {}
