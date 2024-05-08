import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePersonalCheckingAccountDto } from '../dto/create-personalCheckingAccount.dto';
import { UpdatePersonalCheckingAccountDto } from '../dto/update-personalCheckingAccount.dto';
import { PersonalCheckingAccountRepository } from '../repositories/personalCheckingAccount.repository';

@Injectable()
export class PersonalCheckingAccountService {
  constructor(
    private personalCheckingAccountRepository: PersonalCheckingAccountRepository,
  ) {}
  creat(createPersonalCheckingAccountDto: CreatePersonalCheckingAccountDto) {
    return this.personalCheckingAccountRepository.save(
      createPersonalCheckingAccountDto,
    );
  }
  findAll() {
    return this.personalCheckingAccountRepository.find();
  }

  findOne(id: string) {
    return this.personalCheckingAccountRepository.findOne(id);
  }

  async update(
    id: string,
    updatePersonalCheckingAccountDto: UpdatePersonalCheckingAccountDto,
  ) {
    try {
      const personalCheckingAccount = await this.findOne(id);
      personalCheckingAccount.state = updatePersonalCheckingAccountDto.state;
      return this.personalCheckingAccountRepository.save(
        personalCheckingAccount,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const accountGiftCard = await this.findOne(id);
      return this.personalCheckingAccountRepository.remove(accountGiftCard);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
