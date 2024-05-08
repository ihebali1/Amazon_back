import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { IUsers } from '../interfaces/users.interface';
import { UserDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserProfileDto } from '../dto/user-profile.dto';
import { LoginDto } from 'src/login/dto/login.dto';
import { VendorService } from './vendor.service';
import { VendorRepository } from '../repositories/vendor.repository';
import { ClientRepository } from '../repositories/client.repository';
import { TransporterRepository } from 'src/transporter/repositories/transporter.repository';
import { VendorStateEnum } from '../enum/vendor-state.enum';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private vendorRepository: VendorRepository,
    private clientRepository: ClientRepository,
    private transporterRepository: TransporterRepository,
    private vendorService: VendorService,
  ) { }

  public async findByEmail(email: string): Promise<Users> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }

    return user;
  }

  public async isEmailExist(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return false;
    }

    return true;
  }

  public async findById(userId: string): Promise<Users> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['accountGiftCard', 'creditCards', 'personalCheckingAccounts'],
    });

    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    return user;
  }

  public async create(userDto: UserDto): Promise<IUsers> {
    try {
      return await this.userRepository.save(userDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateByEmail(email: string): Promise<Users> {
    try {
      const user = await this.userRepository.findOne({ email: email });
      user.password = bcrypt.hashSync(Math.random().toString(36).slice(-8), 8);

      return await this.userRepository.save(user);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  private async validateVendor(loginDto: LoginDto): Promise<IUsers> {
    return await this.vendorService.findByEmail(loginDto.email);
  }

  public async updateProfileUser(
    id: string,
    userProfileDto: UserProfileDto,
  ): Promise<Users> {
    try {
      const user = await this.userRepository.findOne({ id: id });
      user.firstName = userProfileDto.firstName;
      user.lastName = userProfileDto.lastName;
      user.email = userProfileDto.email;

      return await this.userRepository.save(user);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findUserStatistics() {
    const vendorCount = await this.vendorRepository.count({
      vendorState: VendorStateEnum.VERIFIED
    });
    const customerCount = await this.clientRepository.count();
    const transporterCount = await this.transporterRepository.count();

    return {
      vendorCount,
      customerCount,
      transporterCount,
    }
  }
}
