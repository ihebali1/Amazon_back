import { Injectable } from '@nestjs/common';
import { BuyableProductRepository } from 'src/products/repositories/buyable-product.repository';
import { CreatepromotionsDto } from '../dto/create-promotions.dto';
import { Promotions } from '../entities/promotional-offer.entity';
import { TierPromotions } from '../entities/tier-promotions.entity';
import { PromotionsRepository } from '../repositories/promotions.repository';
import { TierPromotionsRepository } from '../repositories/tier-promotions.repository';

@Injectable()
export class PromotionsService {
  constructor(
    private promotionsRepository: PromotionsRepository,
    private tierPromotionsRepository: TierPromotionsRepository,
    private buyableProductRepository: BuyableProductRepository,
  ) {}
  async create(createPromotionsDto: CreatepromotionsDto, vendorId: string) {
    const promotions = new Promotions();
    promotions.startDate = createPromotionsDto.startDate;
    promotions.endDate = createPromotionsDto.endDate;
    promotions.discount = createPromotionsDto.discount;
    promotions.redemptionLimit = createPromotionsDto.redemptionLimit;
    promotions.description = createPromotionsDto.description;
    promotions.minQuantity = createPromotionsDto.minQuantity;
    promotions.vendor = vendorId;
    promotions.type = createPromotionsDto.type;

    const createdPromotion = await this.promotionsRepository.findOne(
      (
        await this.promotionsRepository.save(promotions)
      ).id,
      {
        relations: ['products', 'appliesTo'],
      },
    );
    for (const product of createPromotionsDto.products) {
      const fetchedProduct = await this.buyableProductRepository.findOne(product);
      createdPromotion.products.push(fetchedProduct);
    }
    for (const applied of createPromotionsDto.appliesTo) {
      const fetchedProduct = await this.buyableProductRepository.findOne(applied);
      createdPromotion.appliesTo.push(fetchedProduct);
    }

    for (const productTier of createPromotionsDto.productTiers) {
      const tier = new TierPromotions();
      tier.discount = productTier.discount;
      tier.quantity = productTier.quantity;
      tier.promotion = createdPromotion;
      await this.tierPromotionsRepository.save(tier);
    }
    return this.promotionsRepository.save(createdPromotion);
  }
  async findVendorPromotions(vendorId: string) {
    return this.promotionsRepository.find({
      where: { vendor: vendorId },
      order: {
        createdAt: 'DESC',
      },
    });
  }
  async findPromotionsById(id: string) {
    return this.promotionsRepository.findOne(id, {
      relations: ['products', 'tier', 'appliesTo'],
    });
  }
}
