import { EntityRepository, Repository } from 'typeorm';
import { PaymentPlatform } from '../entities/payment-platform.entity';

@EntityRepository(PaymentPlatform)
export class PaymentPlatformRepository extends Repository<PaymentPlatform> {}
