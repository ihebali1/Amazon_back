import {
  BadRequestException,
  ConflictException,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotAcceptableException,
  Param,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { RegisterUserDto } from '../dto/register-user.dto';
import { IUsers } from '../../users/interfaces/users.interface';
import * as crypto from 'crypto';
import { OtpDto } from '../dto/otp.dto';
import { VendorService } from 'src/users/services/vendor.service';
import { VendorRepository } from 'src/users/repositories/vendor.repository';
import { ClientService } from 'src/users/services/client.service';
import { ClientRepository } from 'src/users/repositories/client.repository';
import { CartRepository } from 'src/order-product/repositories/cart.repository';
import { Cart } from 'src/order-product/entities/cart.entity';
import { STRIPE_CLIENT } from 'src/stripe/constants';
import Stripe from 'stripe';
import { UserCreatedEvent } from 'src/notification/events/user-created.event';
import { NotificationTypeEnum } from 'src/notification/enums/notification-type.enum';
import { NotificationTargetEnum } from 'src/notification/enums/notification-target.enum';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserSubscriptionRepository } from 'src/user-subscription/repositories/user-subscription.repository';
import { SubscriptionRepository } from 'src/subscription/repositories/subscription.repository';
import { SubscriptionEnum } from 'src/subscription/enums/subscription.enum';
import { UserSubscription } from 'src/user-subscription/entities/user-subscription.entity';
@Injectable()
export class RegisterService {
  constructor(
    private readonly vendorService: VendorService,
    private readonly clientService: ClientService,
    private readonly mailerService: MailerService,
    private readonly vendorRepository: VendorRepository,
    private readonly clientRepository: ClientRepository,
    private readonly cartRepository: CartRepository,
    private readonly userSubscriptionRepository: UserSubscriptionRepository,
    private readonly subscriptionRepository: SubscriptionRepository,
    private eventEmitter: EventEmitter2,
    @Inject(STRIPE_CLIENT) private stripe: Stripe,
  ) { }

  public async registerVendor(
    registerUserDto: RegisterUserDto,
  ): Promise<IUsers> {
    // @TODO add transaction management

    
    const isEmailExist = await this.vendorService.isEmailExist(
      registerUserDto.email,
    );
    if (isEmailExist)
      throw new NotAcceptableException('البريد الإلكتروني مسجل بالفعل');

    registerUserDto.password = bcrypt.hashSync(registerUserDto.password, 8);

    const createdUser = await this.vendorService.create(registerUserDto);
    const customer = await this.stripe.customers.create({
      description: 'My First Test Customer (created for API docs)',
      email: registerUserDto.email,
      name: `${registerUserDto.firstName} ${registerUserDto.lastName}`,
      phone: `${registerUserDto.phone}`,
    });

    const generatedOTP = crypto
      .randomInt(100000, 1000000)
      .toString()
      .padStart(6, '0');
    await this.vendorRepository.update(createdUser.id, { otp: generatedOTP, stripeId: customer.id });

    // attach individual subscription plan to vendor
    const subscription = await this.subscriptionRepository.findOne({
      kind: SubscriptionEnum.INDIVIDUAL
    });
    const userSubscription = new UserSubscription();
    userSubscription.startDate = new Date();
    userSubscription.subscription = subscription;
    userSubscription.vendor = createdUser.id;
    await this.userSubscriptionRepository.save(userSubscription);

    if (createdUser) this.eventEmitter.emit('user.created', {
      user: createdUser.id,
      type: NotificationTypeEnum.USER,
      target: NotificationTargetEnum.USER,
      userIds: [createdUser.id],
    } as UserCreatedEvent);
    return createdUser;
  }

  public async registerClient(
    registerUserDto: RegisterUserDto,
  ): Promise<IUsers> {
    //@TODO add transaction
    const isEmailExist = await this.clientService.isEmailExist(
      registerUserDto.email,
    );
    if (isEmailExist)
      throw new NotAcceptableException('البريد الإلكتروني مسجل بالفعل');

    registerUserDto.password = bcrypt.hashSync(registerUserDto.password, 8);
    //@TODO add catch error when creating customer in stripe

    const customer = await this.stripe.customers.create({
      description: 'My First Test Customer (created for API docs)',
      email: registerUserDto.email,
      name: `${registerUserDto.firstName} ${registerUserDto.lastName}`,
      phone: `${registerUserDto.phone}`,
    });
    const createdUser = await this.clientRepository.save({
      ...registerUserDto,
      stripeId: customer.id,
    });
    const generatedOTP = crypto
      .randomInt(100000, 1000000)
      .toString()
      .padStart(6, '0');
    this.clientRepository.update(createdUser.id, { otp: generatedOTP });
    const cart = new Cart();
    cart.client = createdUser.id;
    await this.cartRepository.save(cart);
    //await this.sendMailRegisterUser(registerUserDto, generatedOTP);
    if (createdUser) this.eventEmitter.emit('user.created', {
      user: createdUser.id,
      type: NotificationTypeEnum.USER,
      target: NotificationTargetEnum.USER,
      userIds: [createdUser.id],
    } as UserCreatedEvent);
    return createdUser;
  }

  public sendMailRegisterUser(user, generatedOTP) {
    this.mailerService
      .sendMail({
        to: user.email,
        from: 'saif29.abdelkader@outlook.com',
        subject: 'Registration successful ✔',
        text: 'Registration successful!',
        template: `${process.cwd()}/templates/emails/index`,
        context: {
          title: 'Registration successfully',
          description: `Your OTP code is : ${generatedOTP}`,
          nameUser: user.name,
        },
      })
      .then((response) => {
        console.log(response);
        console.log('User Registration: Send Mail successfully!');
      })
      .catch((err) => {
        console.log(err);
        console.log('User Registration: Send Mail Failed!');
      });
  }

  public async otpVerifed(otpDto: OtpDto) {
    const fetchedUser = await this.clientRepository.findOne({
      where: { email: otpDto.email, otp: otpDto.otp },
    });
    if (!fetchedUser) {
      throw new BadRequestException('invalid credentials');
    }
    return this.clientRepository.update(fetchedUser.id, {
      isEmailVerfied: true,
      otp: null,
    });
  }

  findOne(id: string) {
    return this.clientRepository.findOne(id);
  }
}
