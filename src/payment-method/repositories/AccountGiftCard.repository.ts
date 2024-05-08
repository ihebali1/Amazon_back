import { EntityRepository, Repository } from 'typeorm';
import { AccountGiftCard } from '../entities/payment-method.entity';

@EntityRepository(AccountGiftCard)
export class AccountGiftCardRepository extends Repository<AccountGiftCard> {}
