import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { BuyableProduct } from 'src/products/entities/product.entity';
import { CreateproductWishDetailsDto } from '../dto/create-productWishDetails.dto';
import { UpdateProductWishDetailsDto } from '../dto/update-ProductWishDetails.dto';
import { ProductWishDetails } from '../entities/ProductWishDetails.entity';
import { ProductWishDetailsRepository } from '../repositories/productWishDetails.repository';
import { WishListRepository } from '../repositories/wishList.repository';

@Injectable()
export class ProductWishDetailsService {
  constructor(
    private productWishDetailsRepository: ProductWishDetailsRepository,
    private wishListRepository: WishListRepository,
  ) {}
  async create(createproductWishDetailsDto: CreateproductWishDetailsDto) {
    const wishList = await this.wishListRepository.findOne(
      createproductWishDetailsDto.wishList,
      {
        relations: ['productWishDetails', 'productWishDetails.product'],
      },
    );
    for (const productWishDetail of wishList.productWishDetails) {
      if (
        ((productWishDetail as ProductWishDetails).product as BuyableProduct).id ==
        createproductWishDetailsDto.product
      )
        throw new BadRequestException('product already added');
    }
    return this.productWishDetailsRepository.save(createproductWishDetailsDto);
  }
  findAll() {
    return this.productWishDetailsRepository.find();
  }

  findOne(id: string) {
    return this.productWishDetailsRepository.findOne(id);
  }

  async update(
    id: string,
    updateProductWishDetailsDto: UpdateProductWishDetailsDto,
  ) {
    try {
      const productWishDetails = await this.findOne(id);
      productWishDetails.comment = updateProductWishDetailsDto.comment;
      return this.productWishDetailsRepository.save(productWishDetails);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const wishList = await this.findOne(id);
      return this.productWishDetailsRepository.remove(wishList);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
