import { Injectable } from '@nestjs/common';
import { UpdateGainDto } from '../dto/update-gain.dto';
import { GainRepository } from '../repositories/gain.repository';

@Injectable()
export class GainService {
  constructor(private gainRepository: GainRepository) {}

  findAll() {
    return this.gainRepository.findOne();
  }

  public async update(id: string, updateGainDto: UpdateGainDto): Promise<any> {
    const gain = await this.gainRepository.findOne(id);
    gain.percentage = updateGainDto.percentage;
    return await this.gainRepository.save(gain);
  }
}
