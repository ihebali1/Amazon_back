import { Module } from '@nestjs/common';
import { PaymentMethodsController } from './controllers/Payment-method.controller';
import { PaymentMethodService } from './services/paymentMethod.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethodRepository } from './repositories/PaymentMethod.repository';
import { AccountGiftCardController } from './controllers/AccountGiftCard.controller';
import { AccountGiftCardService } from './services/accountGiftCard.service';
import { AccountGiftCardRepository } from './repositories/AccountGiftCard.repository';
import { CreditCardService } from './services/CreditCard.service';
import { CreditCardRepository } from './repositories/CreditCard.repository';
import { CreditCardController } from './controllers/CreditCard.controller';
import { PersonalCheckingAccountRepository } from './repositories/personalCheckingAccount.repository';
import { PersonalCheckingAccountService } from './services/personalCheckingAccount.service';
import { PersonalCheckingAccountController } from './controllers/PersonalCheckingAccount.controller';
import { PaymentMethod } from './entities/payment-method.entity';
import { ClientRepository } from 'src/users/repositories/client.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PaymentMethod,
      PaymentMethodRepository,
      AccountGiftCardRepository,
      CreditCardRepository,
      PersonalCheckingAccountRepository,
      ClientRepository,
    ]),
  ],
  controllers: [
    PaymentMethodsController,
    AccountGiftCardController,
    CreditCardController,
    PersonalCheckingAccountController,
  ],
  providers: [
    PaymentMethodService,
    AccountGiftCardService,
    CreditCardService,
    PersonalCheckingAccountService,
  ],
})
export class PaymentMethodModule {}
