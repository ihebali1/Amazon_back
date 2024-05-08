import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateVatDto } from './dto/update-vat.dto';
import { VatRepository } from './repositories/vat.repository';

@Injectable()
export class VatService {
  constructor(private vatRepository: VatRepository) {}

  findAll() {
    return this.vatRepository.find();
  }

  async update(id: string, updateVatDto: UpdateVatDto) {
    const fetchedVat = await this.vatRepository.findOne(id);
    if (!fetchedVat) throw new NotFoundException('VAT NOT FOUND');
    fetchedVat.percentage = updateVatDto.percentage;
    return this.vatRepository.save(fetchedVat);
  }
}
