import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductReviewRepository } from './repositories/product-review.repository';
import { ProductReview } from './entities/product-review.entity';
import { OrderItemRepository } from 'src/order-product/repositories/orderItem.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductReview,
      ProductReviewRepository,
      OrderItemRepository,
    ]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
