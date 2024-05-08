import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyableProductRepository } from 'src/products/repositories/buyable-product.repository';
import { Users } from 'src/users/entities/users.entity';
import { IdeaListController } from './controllers/ideaList.controller';
import { ProductRegistryDetailsController } from './controllers/productRegistryDetails.controller';
import { ProductWishDetailsController } from './controllers/productWishDetails.controller';
import { RegistryController } from './controllers/Registry.controller';
import { SavedItemsController } from './controllers/savedItems.controller';
import { WishListController } from './controllers/wishList.controller';
import { IdeaListRepository } from './repositories/ideaList.repository';
import { ProductRegistryDetailsRepository } from './repositories/productRegistryDetails.repository';
import { ProductWishDetailsRepository } from './repositories/productWishDetails.repository';
import { RegistryRepository } from './repositories/registry.repository';
import { SavedItemsRepository } from './repositories/savedItems.repository';
import { WishListRepository } from './repositories/wishList.repository';
import { IdeaListService } from './services/ideaList.service';
import { ProductRegistryDetailsService } from './services/productRegistryDetails.service';
import { ProductWishDetailsService } from './services/productWishDetails.service';
import { RegistryService } from './services/registry.service';
import { SavedItemsService } from './services/savedItems.service';
import { WishListService } from './services/wishList.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WishListRepository,
      ProductWishDetailsRepository,
      IdeaListRepository,
      BuyableProductRepository,
      SavedItemsRepository,
      Users,
      RegistryRepository,
      ProductRegistryDetailsRepository,
    ]),
  ],
  controllers: [
    WishListController,
    ProductWishDetailsController,
    IdeaListController,
    SavedItemsController,
    RegistryController,
    ProductRegistryDetailsController,
  ],
  providers: [
    WishListService,
    ProductWishDetailsService,
    IdeaListService,
    SavedItemsService,
    RegistryService,
    ProductRegistryDetailsService,
  ],
  exports: [
    WishListService,
    ProductWishDetailsService,
    SavedItemsService,
    RegistryService,
    ProductRegistryDetailsService,
  ],
})
export class ListsModule {}
