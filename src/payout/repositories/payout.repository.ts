import { EntityRepository, Repository } from 'typeorm';
import { CreatePayoutDto } from '../dto/create-payout.dto';
import { Payout } from '../entities/payout.entity';

@EntityRepository(Payout)
export class PayoutRepository extends Repository<Payout> {}
