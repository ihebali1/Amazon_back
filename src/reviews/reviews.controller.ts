import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { Users } from 'src/users/entities/users.entity';
import { ApiTags } from '@nestjs/swagger';
import { FindProductReviewsDto } from './dto/find-product-reviews.dto';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createReviewDto: CreateReviewDto, @CurrentUser() user: Users) {
    return this.reviewsService.create(user.id, createReviewDto);
  }

  @Get('rating-statistics')
  findProductRatingStatistics(
    @Query() findProductReviewsDto: FindProductReviewsDto,
  ) {
    return this.reviewsService.getProductRatingStatistics(
      findProductReviewsDto,
    );
  }

  @Get()
  findProductReviews(@Query() findProductReviewsDto: FindProductReviewsDto) {
    return this.reviewsService.findProductReviews(findProductReviewsDto);
  }
}
