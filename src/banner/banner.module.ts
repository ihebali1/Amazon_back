import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerRepository } from './repositories/banner.repository';
import { ProductBannerRepository } from './repositories/product-banner.repository';
import { VendorBannerRepository } from './repositories/vendor-banner.repository';
import { DepartmentBannerRepository } from './repositories/department-banner.repository';
import { SimpleProductRepository } from 'src/products/repositories/simple-product.repository';
import { ParentListingRepository } from 'src/products/repositories/parent-listing.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BannerRepository,
      ProductBannerRepository,
      VendorBannerRepository,
      DepartmentBannerRepository,
      SimpleProductRepository,
      ParentListingRepository,
    ]),
  ],
  controllers: [BannerController],
  providers: [BannerService],
  exports: [BannerService],
})
export class BannerModule { }
