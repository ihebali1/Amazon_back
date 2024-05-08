import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductRegistryDetailsDto } from '../dto/create-productRegistryDetails.dto';
import { UpdateProductRegistryDetailsDto } from '../dto/update-productRegistryDetails.dto';
import { ProductRegistryDetailsRepository } from '../repositories/productRegistryDetails.repository';

@Injectable()
export class ProductRegistryDetailsService {
  constructor(
    private productRegistryDetailsRepository: ProductRegistryDetailsRepository,
  ) {}
  creat(createProductRegistryDetailsDto: CreateProductRegistryDetailsDto) {
    return this.productRegistryDetailsRepository.save(
      createProductRegistryDetailsDto,
    );
  }
  findAll() {
    return this.productRegistryDetailsRepository.find();
  }

  findOne(id: string) {
    return this.productRegistryDetailsRepository.findOne(id);
  }

  async update(
    id: string,
    updateProductRegistryDetailsDto: UpdateProductRegistryDetailsDto,
  ) {
    try {
      const productWishDetails = await this.findOne(id);
      productWishDetails.comment = updateProductRegistryDetailsDto.comment;
      return this.productRegistryDetailsRepository.save(productWishDetails);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const productRegistryDetails = await this.findOne(id);
      return this.productRegistryDetailsRepository.remove(
        productRegistryDetails,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
