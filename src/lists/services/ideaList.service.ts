import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BuyableProductRepository } from 'src/products/repositories/buyable-product.repository';
import { CreateIdeaListDto } from '../dto/create-ideaList.dto';
import { UpdateIdeaListDto } from '../dto/update-ideaList.dto';
import { IdeaListRepository } from '../repositories/ideaList.repository';

@Injectable()
export class IdeaListService {
  constructor(
    private ideaListRepository: IdeaListRepository,
    private buyableProductRepository: BuyableProductRepository,
  ) { }
  creat(createIdeaListDto: CreateIdeaListDto) {
    return this.ideaListRepository.save(createIdeaListDto);
  }
  findAll() {
    return this.ideaListRepository.find();
  }

  findOne(id: string) {
    return this.ideaListRepository.findOne(id);
  }

  async update(id: string, updateIdeaListDto: UpdateIdeaListDto) {
    try {
      const wishList = await this.findOne(id);
      wishList.title = updateIdeaListDto.title;
      return this.ideaListRepository.save(wishList);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async addProduct(id: string, productId: string) {
    try {
      const ideaList = await this.findOne(id);
      const product = await this.buyableProductRepository.findOne(productId, {
        relations: ['ideaLists'],
      });
      product.ideaLists.push(ideaList);
      return this.buyableProductRepository.save(product);
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string, productId: string) {
    try {
      const product = await this.buyableProductRepository.findOne(productId);

      product.ideaLists = product.ideaLists.filter((ideaList) => {
        return ideaList.id !== id;
      });
      return this.buyableProductRepository.save(product);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
