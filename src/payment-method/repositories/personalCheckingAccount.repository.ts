import { EntityRepository, Repository } from 'typeorm';
import { PersonalCheckingAccount } from '../entities/payment-method.entity';

@EntityRepository(PersonalCheckingAccount)
export class PersonalCheckingAccountRepository extends Repository<PersonalCheckingAccount> {}
