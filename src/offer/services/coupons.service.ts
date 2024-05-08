import { Injectable, NotFoundException } from '@nestjs/common';
import { BuyableProductRepository } from 'src/products/repositories/buyable-product.repository';
import { VendorRepository } from 'src/users/repositories/vendor.repository';
import { CreateCouponsDto } from '../dto/create-coupons.dto';
import { CreateOfferDto } from '../dto/create-offer.dto';
import { Coupons } from '../entities/promotional-offer.entity';
import { CouponsRepository } from '../repositories/coupons.repository';

@Injectable()
export class CouponsService {
  constructor(
    private couponsRepository: CouponsRepository,
    private vendorRepository: VendorRepository,
    private buyableProductRepository: BuyableProductRepository,
  ) {}
  async create(createCouponsDto: CreateCouponsDto, vendorId: string) {
    const coupons = new Coupons();
    coupons.title = createCouponsDto.title;
    coupons.budget = createCouponsDto.budget;
    coupons.startDate = createCouponsDto.startDate;
    coupons.endDate = createCouponsDto.endDate;
    coupons.vendor = vendorId;
    coupons.discount = createCouponsDto.discount;
    coupons.redemptionLimit = createCouponsDto.redemptionLimit;
    coupons.type = createCouponsDto.type;
    const createdCoupon = await this.couponsRepository.findOne(
      (
        await this.couponsRepository.save(coupons)
      ).id,
      { relations: ['products'] },
    );
    for (const product of createCouponsDto.products) {
      //@TODO fix this
      const fetchedProduct = await this.buyableProductRepository.findOne(product);
      createdCoupon.products.push(fetchedProduct);
    }
    return this.couponsRepository.save(createdCoupon);
  }
  async findVendorCoupons(vendorId: string) {
    /*const vendor = await this.vendorRepository.findOne(vendorId);
    if (!vendor) {
      throw new NotFoundException('vendor not fount');
    }*/
    return this.couponsRepository.find({
      where: { vendor: vendorId },
      order: {
        createdAt: 'DESC',
      },
    });
  }
  async findCouponsById(id: string) {
    return this.couponsRepository.findOne(id, {
      relations: ['products'],
    });
  }
}
