import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAccountGiftCardDto } from '../dto/create-accountGiftCard.dto';
import { UpdateaccountGiftCardDto } from '../dto/update-accountGiftCard.dto';
import { AccountGiftCardRepository } from '../repositories/AccountGiftCard.repository';

@Injectable()
export class AccountGiftCardService {
  constructor(private accountGiftCardRepository: AccountGiftCardRepository) {}
  creat(accountGiftCardDto: CreateAccountGiftCardDto) {
    return this.accountGiftCardRepository.save(accountGiftCardDto);
  }
  findAll() {
    return this.accountGiftCardRepository.find();
  }

  findOne(id: string) {
    return this.accountGiftCardRepository.findOne(id);
  }

  async update(id: string, updatePaymentMethodDto: UpdateaccountGiftCardDto) {
    try {
      const accountGiftCard = await this.findOne(id);
      accountGiftCard.name = updatePaymentMethodDto.name;
      return this.accountGiftCardRepository.save(accountGiftCard);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const accountGiftCard = await this.findOne(id);
      return this.accountGiftCardRepository.remove(accountGiftCard);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
