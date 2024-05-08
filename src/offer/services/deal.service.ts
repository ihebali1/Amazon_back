import {
  HttpException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { getConnection } from 'typeorm';
import { CreateDealsDto } from '../dto/create-deals.dto.';
import { FindDealsDto } from '../dto/find-deals.dto';
import { DealProduct } from '../entities/deal-product.entity';
import { Deals } from '../entities/promotional-offer.entity';
import { DealsTypeEnum } from '../enums/deals-type.enum';
import { DealProductRepository } from '../repositories/deal-product.repository';
import { DealsRepository } from '../repositories/deals.repository';

@Injectable()
export class DealService {
  constructor(
    private dealRepository: DealsRepository,
    private dealProductRepository: DealProductRepository,
  ) {}

  getSundayFromWeekNum(weekNum, year) {
    const sunday = new Date(year, 0, 1 + (weekNum - 1) * 7);
    while (sunday.getDay() !== 0) {
      sunday.setDate(sunday.getDate() - 1);
    }
    return sunday;
  }

  async getDealsByVendor(vendorId: string) {
    return this.dealRepository.findVendorDeals(vendorId);
  }

  async getDealFullDetails(dealId: string) {
    return this.dealRepository.findDealFullDetails(dealId);
  }
  async create(createDealDto: CreateDealsDto, vendorId: string) {
    // get a connection and create a new query runner
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();

    // lets now open a new transaction:
    await queryRunner.startTransaction();

    try {
      // execute some operations on this transaction:
      const deal = new Deals();
      deal.vendor = vendorId;
      deal.dealType = createDealDto.type;
      if (deal.dealType == DealsTypeEnum.WEEKDEAL) {
        deal.startDate = new Date();
        deal.endDate = new Date();
        deal.endDate.setDate(deal.startDate.getDate() + 7);
      }
      if (deal.dealType == DealsTypeEnum.LIGHTDEAL) {
        deal.startDate = new Date();
        deal.endDate = new Date();
        deal.endDate.setHours(deal.startDate.getHours() + createDealDto.hours);
      }
      const createdDeal = await queryRunner.manager.save(deal);
      for (const productDeal of createDealDto.productDeals) {
        const productId = productDeal.product;
        const fetchProductDeals = await queryRunner.manager.find(DealProduct, {
          relations: ['deal', 'product'],
          where: { product: productId },
        });
        for (const fetchedProductDeal of fetchProductDeals) {
          if (
            (fetchedProductDeal.deal as Deals).startDate < new Date() &&
            (fetchedProductDeal.deal as Deals).endDate > new Date()
          ) {
            throw new NotAcceptableException(
              `المنتج 6262 به عرض  نشط ، لا يمكنك إضافة عرض آخر`,
            );
          }
        }
        await queryRunner.manager.save(DealProduct, {
          ...productDeal,
          deal: createdDeal,
        });
      }

      // commit transaction now:
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException(err, err?.status);
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
  }

  getActiveDealsProducts(findDealsFilter: FindDealsDto) {
    return this.dealProductRepository.findActiveDealProducts(
      findDealsFilter,
    );
  }
}
