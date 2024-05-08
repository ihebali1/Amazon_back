import { Injectable } from '@nestjs/common';
import { ProductTypeEnum } from 'src/products/enums/product-type.enum';
import { CreateProductViewHistoryDto } from '../dto/create-product-view-history.dto';
import { ProductViewHistory } from '../entities/history.entity';
import { ProductViewHistoryRepository } from '../repositories/product-view-history.repository';

@Injectable()
export class HistoryService {
  constructor(
    private productViewHistoryRepository: ProductViewHistoryRepository,
  ) {}

  findAllProductViewHistoryByClient(userId: string) {
    return this.productViewHistoryRepository.find({
      where: { client: userId },
      relations: [
        'simpleProduct',
        'simpleProduct.primaryImage',
        'parentListing',
        'parentListing.primaryImage',
      ],
      order: { lastViewAt: 'DESC' },
    });
  }

  async createProductViewHistory(
    userId: string,
    createProductViewHistoryDto: CreateProductViewHistoryDto,
  ) {
    if (createProductViewHistoryDto.type == ProductTypeEnum.SIMPLE_LISTING) {
      const fetechedProductViewHistory =
        await this.productViewHistoryRepository.findOne({
          simpleProduct: createProductViewHistoryDto.product,
          client: userId,
        });
      if (fetechedProductViewHistory) {
        fetechedProductViewHistory.lastViewAt = new Date();
        fetechedProductViewHistory.viewCount++;
        return this.productViewHistoryRepository.save(
          fetechedProductViewHistory,
        );
      } else {
        const productViewHistory = new ProductViewHistory();
        productViewHistory.simpleProduct = createProductViewHistoryDto.product;
        productViewHistory.client = userId;
        productViewHistory.lastViewAt = new Date();
        productViewHistory.viewCount = 1;
        return this.productViewHistoryRepository.save(productViewHistory);
      }
    } else {
      const fetechedProductViewHistory =
        await this.productViewHistoryRepository.findOne({
          parentListing: createProductViewHistoryDto.product,
          client: userId,
        });
      if (fetechedProductViewHistory) {
        fetechedProductViewHistory.lastViewAt = new Date();
        fetechedProductViewHistory.viewCount++;
        return this.productViewHistoryRepository.save(
          fetechedProductViewHistory,
        );
      } else {
        const productViewHistory = new ProductViewHistory();
        productViewHistory.parentListing = createProductViewHistoryDto.product;
        productViewHistory.client = userId;
        productViewHistory.lastViewAt = new Date();
        productViewHistory.viewCount = 1;
        return this.productViewHistoryRepository.save(productViewHistory);
      }
    }
  }
}
