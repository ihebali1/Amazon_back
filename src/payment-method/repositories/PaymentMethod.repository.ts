import { EntityRepository, Repository } from 'typeorm';
import { PaymentMethod } from '../entities/payment-method.entity';

@EntityRepository(PaymentMethod)
export class PaymentMethodRepository extends Repository<PaymentMethod> {}
