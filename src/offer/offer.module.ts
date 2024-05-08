import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyableProduct } from 'src/products/entities/product.entity';
import { BuyableProductRepository } from 'src/products/repositories/buyable-product.repository';
import { Vendor } from 'src/users/entities/users.entity';
import { VendorRepository } from 'src/users/repositories/vendor.repository';
import { CouponsController } from './controllers/coupons.controller';
import { DealsController } from './controllers/deals.controller';
import { OfferController } from './controllers/offer.controller';
import { PromotionsController } from './controllers/promotions.controller';
import {
  Coupons,
  Deals,
  PromotinalOffer,
  Promotions,
} from './entities/promotional-offer.entity';
import { TierPromotions } from './entities/tier-promotions.entity';
import { CouponsRepository } from './repositories/coupons.repository';
import { DealProductRepository } from './repositories/deal-product.repository';
import { DealsRepository } from './repositories/deals.repository';
import { PromotinalOfferRepository } from './repositories/promotional-offer.repository';
import { PromotionsRepository } from './repositories/promotions.repository';
import { TierPromotionsRepository } from './repositories/tier-promotions.repository';
import { CouponsService } from './services/coupons.service';
import { DealService } from './services/deal.service';
import { OfferService } from './services/offer.service';
import { PromotionsService } from './services/promotions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PromotinalOffer,
      PromotinalOfferRepository,
      Coupons,
      CouponsRepository,
      Deals,
      DealsRepository,
      Promotions,
      PromotionsRepository,
      VendorRepository,
      Vendor,
      TierPromotions,
      TierPromotionsRepository,
      BuyableProduct,
      BuyableProductRepository,
      DealProductRepository,
    ]),
  ],
  controllers: [
    OfferController,
    CouponsController,
    PromotionsController,
    DealsController,
  ],
  providers: [OfferService, CouponsService, DealService, PromotionsService],
})
export class OfferModule {}
