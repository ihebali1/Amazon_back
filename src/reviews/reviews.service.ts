import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { OrderItemRepository } from 'src/order-product/repositories/orderItem.repository';
import { ProductTypeEnum } from 'src/products/enums/product-type.enum';
import { CreateReviewDto } from './dto/create-review.dto';
import { FindProductReviewsDto } from './dto/find-product-reviews.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ProductReview } from './entities/product-review.entity';
import { ProductReviewRepository } from './repositories/product-review.repository';

@Injectable()
export class ReviewsService {
  constructor(
    private productReviewRepository: ProductReviewRepository,
    private orderItemRepository: OrderItemRepository,
  ) {}

  async create(clientId: string, createReviewDto: CreateReviewDto) {
    const productReview = new ProductReview();
    productReview.client = clientId;
    productReview.content = createReviewDto.content;
    productReview.rating = createReviewDto.rating;
    if (createReviewDto.productType == ProductTypeEnum.SIMPLE_LISTING) {
      const fetchedOrderItems =
        await this.orderItemRepository.findOrderItemByProductAndCustomer(
          createReviewDto.product,
          clientId,
        );
      if (fetchedOrderItems.length == 0)
        throw new BadRequestException('REVIEW ONLY PURCHASED PRODUCTS');
      
    }
    productReview.product = createReviewDto.product;
    return this.productReviewRepository.save(productReview);
  }

  findProductReviews(findProductReviewsDto: FindProductReviewsDto) {
    if (findProductReviewsDto.productType == ProductTypeEnum.SIMPLE_LISTING) {
      return this.productReviewRepository.find({
        relations: ['client'],
        where: { product: findProductReviewsDto.product },
      });
    }
    if (findProductReviewsDto.productType == ProductTypeEnum.PARENT_LISTING) {
      return this.productReviewRepository.find({
        relations: ['client'],
        where: { product: findProductReviewsDto.product },
      });
    }
  }

  async getProductRatingStatistics(
    findProductReviewsDto: FindProductReviewsDto,
  ) {
    const ratingStatistics =
      await this.productReviewRepository.findProductRatingStatistics(
        findProductReviewsDto.product,
      );
    const productRatingCount = await this.productReviewRepository.count({
      where: { product: findProductReviewsDto.product },
    });
    const avgRating =
      await this.productReviewRepository.findProductRatingAverageStatistics(
        findProductReviewsDto.product,
      );
    return {
      productRatingCount,
      ratingStatistics,
      avgRating,
    };
  }

  remove(id: string) {
    return this.productReviewRepository.delete(id);
  }
}
