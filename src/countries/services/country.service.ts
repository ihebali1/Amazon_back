import { Injectable } from '@nestjs/common';
import { CountryRepository } from '../repositories/country.repository';

@Injectable()
export class CountryService {
  constructor(private countryRepository: CountryRepository) {}

  findAll() {
    return this.countryRepository.find();
  }
}
