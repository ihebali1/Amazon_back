import { Injectable, NotFoundException } from '@nestjs/common';
import { Vendor } from 'src/users/entities/users.entity';
import { VendorRepository } from 'src/users/repositories/vendor.repository';
import { Repository } from 'typeorm';

@Injectable()
export class VerifyService {
  constructor(
    private readonly vendorRepository: Repository<VendorRepository>,
  ) {}

  public async isEmailExist(email: string): Promise<boolean> {
    const vendor = await this.vendorRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!vendor) {
      return false;
    }

    return true;
  }
  public async isPhoneExist(phone: string): Promise<boolean> {
    const vendor = await this.vendorRepository.findOne({
      where: {
        phone: phone,
      },
    });

    if (!vendor) {
      return false;
    }

    return true;
  }
}
