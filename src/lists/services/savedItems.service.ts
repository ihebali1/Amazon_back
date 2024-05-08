import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BuyableProductRepository } from 'src/products/repositories/buyable-product.repository';
import { CreateSavedItemsDto } from '../dto/create-savedItems.dto';
import { UpdateSavedItemsDto } from '../dto/update-savedItems.dto';
import { SavedItemsRepository } from '../repositories/savedItems.repository';

@Injectable()
export class SavedItemsService {
  constructor(
    private savedItemsRepository: SavedItemsRepository,
    private buyableProductRepository: BuyableProductRepository,
  ) {}
  creat(createSavedItemsDto: CreateSavedItemsDto) {
    return this.savedItemsRepository.save(createSavedItemsDto);
  }
  findAll() {
    return this.savedItemsRepository.find();
  }

  findOne(id: string) {
    return this.savedItemsRepository.findOne(id);
  }

  async update(id: string, updateSavedItemsDto: UpdateSavedItemsDto) {
    try {
      const wishList = await this.findOne(id);
      wishList.title = updateSavedItemsDto.title;
      return this.savedItemsRepository.save(wishList);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  public async findById(savesItemsId: string) {
    const SI = await this.savedItemsRepository.findOne({
      where: {
        id: savesItemsId,
      },
    });

    if (!SI) {
      throw new NotFoundException(`User #${savesItemsId} not found`);
    }

    return SI;
  }
  async addProduct(id: string, productId: string) {
    try {
      const savedItems = await this.findById(id);
      console.log(savedItems);
      const product = await this.buyableProductRepository.findOne(productId, {
        relations: ['savedItemss'],
      });
      product.savedItemss.push(savedItems);
      console.log(product);
      const update = await this.buyableProductRepository.save(product);
      return this.findById(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const savedItems = await this.findOne(id);
      return this.savedItemsRepository.remove(savedItems);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
