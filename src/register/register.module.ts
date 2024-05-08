import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterService } from './services/register.service';
import { Client, Users } from '../users/entities/users.entity';
import { UsersModule } from 'src/users/users.module';
import { VendorRepository } from 'src/users/repositories/vendor.repository';
import { VendorService } from 'src/users/services/vendor.service';
import { VerificationVendorController } from './controllers/verification-vendor.controller';
import { RegisterVendorController } from './controllers/register-vendor.controller';
import { VerificationVendorService } from './services/verification-vendor.service';
import { CountryRepository } from 'src/countries/repositories/country.repository';
import { CountryController } from 'src/countries/controllers/country.controller';
import { CountryService } from 'src/countries/services/country.service';
import { Country } from 'src/countries/entities/country.entity';
import { CountriesModule } from 'src/countries/countries.module';
import { ClientService } from 'src/users/services/client.service';
import { ClientRepository } from 'src/users/repositories/client.repository';
import { RegisterClientController } from './controllers/register-client.controller';
import { CartRepository } from 'src/order-product/repositories/cart.repository';
import { Cart } from 'src/order-product/entities/cart.entity';
import { TransporterModule } from 'src/transporter/transporter.module';
import { SubscriptionRepository } from 'src/subscription/repositories/subscription.repository';
import { UserSubscriptionRepository } from 'src/user-subscription/repositories/user-subscription.repository';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { UserSubscription } from 'src/user-subscription/entities/user-subscription.entity';
import { UserSubscriptionModule } from 'src/user-subscription/user-subscription.module';
import { SubscriptionModule } from 'src/subscription/subscription.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      VendorRepository,
      Country,
      CountryRepository,
      Client,
      ClientRepository,
      CartRepository,
      Cart,
    ]),
    UsersModule,
    CountriesModule,
    RegisterModule,
    TransporterModule,
    UserSubscriptionModule,
    SubscriptionModule
  ],
  controllers: [
    RegisterVendorController,
    VerificationVendorController,
    CountryController,
    RegisterClientController,
  ],
  providers: [
    RegisterService,
    VendorService,
    ClientService,
    VerificationVendorService,
    CountryService,
  ],
})
export class RegisterModule {}
