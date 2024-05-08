import { BadRequestException, HttpException, Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { Payment } from 'src/payment/entities/payment.entity';
import { PaymentTypeEnum } from 'src/payment/enums/payment-type.enum';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { SubscriptionEnum } from 'src/subscription/enums/subscription.enum';
import { getConnection, MoreThan, Not } from 'typeorm';
import { CreateUserSubscriptionDto } from './dto/create-user-subscription.dto';
import { UpdateUserSubscriptionDto } from './dto/update-user-subscription.dto';
import { UserSubscription } from './entities/user-subscription.entity';
import Stripe from 'stripe';
import { STRIPE_CLIENT } from 'src/stripe/constants';
import { Vendor } from 'src/users/entities/users.entity';
import { UserSubscriptionRepository } from './repositories/user-subscription.repository';
import { SubscriptionRepository } from 'src/subscription/repositories/subscription.repository';
import { GainHistory } from 'src/gain/entities/gain-history.entity';
import { GainEnum } from 'src/gain/enums/gain.enum';

@Injectable()
export class UserSubscriptionService {
  constructor(@Inject(STRIPE_CLIENT) private stripe: Stripe,
    private userSubscriptionRepository: UserSubscriptionRepository,
    private subscriptionRepository: SubscriptionRepository,
  ) {

  }

  async create(createUserSubscriptionDto: CreateUserSubscriptionDto, vendorId: string) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();

    // lets now open a new transaction:
    await queryRunner.startTransaction();

    try {

      const fetchedSubscription = await queryRunner.manager.findOne(Subscription, createUserSubscriptionDto.subscription);
      if (!fetchedSubscription)
        throw new BadRequestException('Invalid subscription');
      if (fetchedSubscription.kind != SubscriptionEnum.PROFESSIONAL)
        throw new BadRequestException('Invalid subscription');

      const userSubscription = new UserSubscription();
      userSubscription.subscription = createUserSubscriptionDto.subscription;
      userSubscription.vendor = vendorId;
      userSubscription.startDate = new Date();

      if (fetchedSubscription.kind == SubscriptionEnum.PROFESSIONAL) {
        const vendorActiveSubscription = await this.userSubscriptionRepository.findUserActiveProfessionalSubscription(vendorId);
        if (vendorActiveSubscription) throw new NotAcceptableException('المستخدم لديه خطة اشتراك نشطة');

        const fetchedUserActiveIndividualSubscription = await this.userSubscriptionRepository.findUserActiveIndividualSubscription(vendorId);
        if (fetchedUserActiveIndividualSubscription) {
          fetchedUserActiveIndividualSubscription.isActive = false;
          fetchedUserActiveIndividualSubscription.endDate = new Date();
          await queryRunner.manager.save(UserSubscription, fetchedUserActiveIndividualSubscription);
        }

        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        userSubscription.endDate = date;

        // Store payment info
        const paymentInfo = new Payment();
        paymentInfo.paidAmount = fetchedSubscription.price;
        paymentInfo.feeAmount = 0;
        paymentInfo.paid = true;
        paymentInfo.type = PaymentTypeEnum.STRIPE;
        const createdPaymentInfo = await queryRunner.manager.save(paymentInfo);
        userSubscription.paymentInfo = createdPaymentInfo;
        await queryRunner.manager.save(UserSubscription, userSubscription);
        const fetchedVendor = await queryRunner.manager.findOne(Vendor, vendorId);

        // Store platform gain amount
        const gainHistory = new GainHistory();
        gainHistory.payment = paymentInfo;
        gainHistory.type = GainEnum.SUBSCRIPTION;
        gainHistory.amount = fetchedSubscription.price;
        await queryRunner.manager.save(gainHistory);

        // Process payment
        try {
          const source = await this.stripe.customers.createSource(
            fetchedVendor.stripeId,
            {
              source: createUserSubscriptionDto.cardToken,
            },
          );
          await this.stripe.charges.create({
            amount: fetchedSubscription.price * 100,
            currency: 'usd',
            source: source.id,
            customer: fetchedVendor.stripeId,
          });

        } catch (error) {
          throw new BadRequestException(error);
        }

      }
      await queryRunner.commitTransaction();



    } catch (error) {

      await queryRunner.rollbackTransaction();
      throw new NotAcceptableException(error);
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
  }

  findAll() {
    return this.userSubscriptionRepository.find();
  }

  findOne(id: string) {
    return this.userSubscriptionRepository.findOne(id);
  }

  async findUserActiveSubscription(userId: string) {
    const fetchedUserActiveIndividualSubscription = await this.userSubscriptionRepository.findUserActiveIndividualSubscription(userId);
    const fetchedUserProfessionalSubscription = await this.userSubscriptionRepository.findUserActiveProfessionalSubscription(userId);
    if (fetchedUserActiveIndividualSubscription) return fetchedUserActiveIndividualSubscription;
    else if (fetchedUserProfessionalSubscription) return fetchedUserProfessionalSubscription;
    else return null;
  }

  async cancelSubscription(id: string) {
    // @TODO add transaction
    const fetchedUserSubscription = await this.userSubscriptionRepository.findOne(id, {
      relations: ['vendor']
    });
    fetchedUserSubscription.isActive = false;
    fetchedUserSubscription.endDate = new Date();
    await this.userSubscriptionRepository.save(fetchedUserSubscription);

    const subscription = await this.subscriptionRepository.findOne({
      kind: SubscriptionEnum.INDIVIDUAL
    });
    const userSubscription = new UserSubscription();
    userSubscription.startDate = new Date();
    userSubscription.subscription = subscription;
    userSubscription.vendor = fetchedUserSubscription.vendor;
    await this.userSubscriptionRepository.save(userSubscription);
  }

  update(id: number, updateUserSubscriptionDto: UpdateUserSubscriptionDto) {
    return `This action updates a #${id} userSubscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} userSubscription`;
  }
}
