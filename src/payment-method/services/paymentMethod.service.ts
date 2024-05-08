import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { STRIPE_CLIENT } from 'src/stripe/constants';
import { ClientRepository } from 'src/users/repositories/client.repository';
import Stripe from 'stripe';
import { CreatePaymentMethodDto } from '../dto/create-paymentMethod.dto';
import { UpdatePaymentMethodDto } from '../dto/update-PaymentMethod.dto';
import { PaymentMethodRepository } from '../repositories/PaymentMethod.repository';

@Injectable()
export class PaymentMethodService {
  constructor(
    private paymentMethodRepository: PaymentMethodRepository,
    private clientRepository: ClientRepository,
    @Inject(STRIPE_CLIENT) private stripe: Stripe,
  ) {}

  creat(paymentMethodDto: CreatePaymentMethodDto) {
    return this.paymentMethodRepository.save(paymentMethodDto);
  }

  async findAll(stripeId: string) {
    //const fetchedClient = await this.clientRepository.findOne(clientId);
    const customer = await this.stripe.customers.retrieve(stripeId);
    const paymentMethods = (
      await this.stripe.customers.listPaymentMethods(stripeId, { type: 'card' })
    ).data;
    return {
      default: (customer as any).default_source,
      paymentMethods,
    };
  }

  findOne(id: string) {
    return this.paymentMethodRepository.findOne(id);
  }

  async update(id: string, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    try {
      const paymentMethod = await this.findOne(id);
      paymentMethod.name = updatePaymentMethodDto.name;
      return this.paymentMethodRepository.save(paymentMethod);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const paymentMethod = await this.findOne(id);
      return this.paymentMethodRepository.remove(paymentMethod);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
