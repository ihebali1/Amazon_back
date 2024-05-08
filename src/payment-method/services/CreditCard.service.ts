import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCreditCardDto } from '../dto/create-creditCard.dto';
import { UpdateCreditCardDto } from '../dto/update-CreditCard.dto';
import { CreditCardRepository } from '../repositories/CreditCard.repository';

@Injectable()
export class CreditCardService {
  constructor(private creditCardRepository: CreditCardRepository) {}
  creat(accountGiftCardDto: CreateCreditCardDto) {
    return this.creditCardRepository.save(accountGiftCardDto);
  }
  findAll() {
    return this.creditCardRepository.find();
  }

  findOne(id: string) {
    return this.creditCardRepository.findOne(id);
  }

  async update(id: string, updateCreditCardDto: UpdateCreditCardDto) {
    try {
      const accountGiftCard = await this.findOne(id);
      //accountGiftCard.cardNumber = updateCreditCardDto.cardNumber;
      return this.creditCardRepository.save(accountGiftCard);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const accountGiftCard = await this.findOne(id);
      return this.creditCardRepository.remove(accountGiftCard);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
