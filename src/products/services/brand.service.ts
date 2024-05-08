import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { FindBrandsFilter } from '../dto/find-brand-filter.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { BrandRepository } from '../repositories/brand.repository';

@Injectable()
export class BrandService {
  constructor(private brandRepository: BrandRepository) { }

  create(createBrandDto: CreateBrandDto) {
    return this.brandRepository.save(createBrandDto);
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    try {
      const brand = await this.findOne(id);
      brand.name = updateBrandDto.name;
      brand.image = updateBrandDto.image;
      return this.brandRepository.save(brand);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  findAll(findBrandsFilter?: FindBrandsFilter) {
    if (findBrandsFilter && findBrandsFilter.department)
      return this.brandRepository.findBrandByDepartment(findBrandsFilter.department);
      
    return this.brandRepository.find({
      relations: ['image'],
      order: { name: 'ASC' },
    });
  }

  findOne(id: string) {
    return this.brandRepository.findOne(id, {
      relations: ['image'],
    });
  }

  remove(id: string) {
    return this.brandRepository.delete(id);
  }
}
