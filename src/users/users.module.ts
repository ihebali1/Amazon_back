import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';
import { ClientService } from './services/client.service';
import { IdeaListRepository } from 'src/lists/repositories/ideaList.repository';
import { WishListRepository } from 'src/lists/repositories/wishList.repository';
import { SavedItemsRepository } from 'src/lists/repositories/savedItems.repository';
import { CartRepository } from 'src/order-product/repositories/cart.repository';
import { RegistryRepository } from 'src/lists/repositories/registry.repository';
import { UsersRepository } from './repositories/users.repository';
import { RegisterService } from 'src/register/services/register.service';
import { VendorRepository } from './repositories/vendor.repository';
import { VendorService } from './services/vendor.service';
import { Country } from 'src/countries/entities/country.entity';
import { CountryRepository } from 'src/countries/repositories/country.repository';
import { CountriesModule } from 'src/countries/countries.module';
import { VendorController } from './controllers/vendor.controller';
import { File } from 'src/file/entities/file.entity';
import { ClientRepository } from './repositories/client.repository';
import { ClientController } from './controllers/client.controller';
import { FileModule } from 'src/file/file.module';
import { Income } from 'src/income/entities/income.entity';
import { AdressRepository } from './repositories/address.repository';
import { Adress } from './entities/adress.entity';
import { AdminRepository } from './repositories/admin.repository';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.service';
import { ProductReview } from 'src/reviews/entities/product-review.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { SubscriptionRepository } from 'src/subscription/repositories/subscription.repository';
import { UserSubscription } from 'src/user-subscription/entities/user-subscription.entity';
import { UserSubscriptionRepository } from 'src/user-subscription/repositories/user-subscription.repository';
import { TransporterRepository } from 'src/transporter/repositories/transporter.repository';
import { SimpleProduct } from 'src/products/entities/product.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      UsersRepository,
      IdeaListRepository,
      WishListRepository,
      SavedItemsRepository,
      CartRepository,
      RegistryRepository,
      VendorRepository,
      Country,
      CountryRepository,
      SimpleProduct,
      File,
      ClientRepository,
      Income,
      AdressRepository,
      Adress,
      AdminRepository,
      ProductReview,
      SubscriptionRepository,
      Subscription,
      UserSubscription,
      UserSubscriptionRepository,
      TransporterRepository,
    ]),
    CountriesModule,
    FileModule,
  ],
  controllers: [
    UsersController,
    VendorController,
    ClientController,
    AdminController,
  ],
  providers: [
    UsersService,
    ClientService,
    RegisterService,
    VendorService,
    AdminService,
  ],
  exports: [
    UsersService,
    VendorService,
    ClientService,
    RegisterService,
    TypeOrmModule,
  ],
})
export class UsersModule {}
