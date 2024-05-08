import { EntityRepository, Repository } from 'typeorm';
import { ProductReview } from '../entities/product-review.entity';

@EntityRepository(ProductReview)
export class ProductReviewRepository extends Repository<ProductReview> {
  async findProductRatingStatistics(productId: string) {
    return this.createQueryBuilder('reviews')
      .select('COUNT(reviews.id) AS count_rating')
      .addSelect('reviews.rating AS rating')
      .leftJoin('reviews.product', 'product')
      .where('product.id = :productId', { productId })
      .groupBy('reviews.rating')
      .orderBy('reviews.rating', 'DESC')
      .getRawMany();
  }

  async findProductRatingAverageStatistics(productId: string) {
    return this.createQueryBuilder('reviews')
      .select('AVG(reviews.rating) AS avg_rating')
      .leftJoin('reviews.product', 'product')
      .where('product.id = :productId', { productId })
      .getRawOne();
  }
}
