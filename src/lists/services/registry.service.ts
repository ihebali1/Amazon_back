import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BuyableProductRepository } from 'src/products/repositories/buyable-product.repository';
import { CreateRegistryDto } from '../dto/create-registry.dto';
import { UpdateRegistryDto } from '../dto/update-registry.dto';
import { RegistryRepository } from '../repositories/registry.repository';

@Injectable()
export class RegistryService {
  constructor(
    private registryRepository: RegistryRepository,
    private buyableProductRepository: BuyableProductRepository,
  ) {}
  creat(createRegistryDto: CreateRegistryDto) {
    return this.registryRepository.save(createRegistryDto);
  }
  findAll() {
    return this.registryRepository.find();
  }

  findOne(id: string) {
    return this.registryRepository.findOne(id);
  }

  async update(id: string, updateRegistryDto: UpdateRegistryDto) {
    try {
      const registry = await this.findOne(id);
      registry.date = updateRegistryDto.date;
      return this.registryRepository.save(registry);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const savedItems = await this.findOne(id);
      return this.registryRepository.remove(savedItems);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
