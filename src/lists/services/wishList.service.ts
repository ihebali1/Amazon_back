import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWishListDto } from '../dto/create-wishList.dto';
import { UpdateWishListDto } from '../dto/update-wishList.dto';
import { WishListRepository } from '../repositories/wishList.repository';

@Injectable()
export class WishListService {
  constructor(private wishListRepository: WishListRepository) {}
  create(clientId: string, createwishListDto: CreateWishListDto) {
    return this.wishListRepository.save({
      ...createwishListDto,
      client: clientId,
    });
  }

  findUserWishLists(clientId: string) {
    return this.wishListRepository.findClientWishLists(clientId);
  }

  findOne(id: string) {
    return this.wishListRepository.findOne(id);
  }

  async update(id: string, updateWishListDto: UpdateWishListDto) {
    try {
      const wishList = await this.findOne(id);
      wishList.title = updateWishListDto.title;
      return this.wishListRepository.save(wishList);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async remove(id: string) {
    try {
      const wishList = await this.findOne(id);
      return this.wishListRepository.remove(wishList);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
