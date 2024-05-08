import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationTargetEnum } from 'src/notification/enums/notification-target.enum';
import { NotificationTypeEnum } from 'src/notification/enums/notification-type.enum';
import { VendorStatusUpdatedEvent } from 'src/notification/events/user-status-updated.event';
import { RegisterUserDto } from 'src/register/dto/register-user.dto';
import { In } from 'typeorm';
import { UpdateBankInfoDto } from '../dto/update-bank-info.dto';
import { UpdateBusinessInfoDto } from '../dto/update-business-info.dto';
import { UpdatePersonnalInfoDto } from '../dto/update-personnal-info.dto';
import { UpdateVendorDocumentDto } from '../dto/update-vendor-document.dto';
import { UpdateVendorStatusDto } from '../dto/update.vendor.status.dto';
import { Vendor } from '../entities/users.entity';
import { VendorStateEnum } from '../enum/vendor-state.enum';
import { IUsers } from '../interfaces/users.interface';
import { VendorRepository } from '../repositories/vendor.repository';

@Injectable()
export class VendorService {
  constructor(private vendorRepository: VendorRepository,
    private eventEmitter: EventEmitter2,) { }

  public async findByEmail(email: string): Promise<Vendor> {
    const user = await this.vendorRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new NotFoundException(`معلومات تسجيل دخول غير صالحة`);
    }
    return user;
  }

  public async isEmailExist(email: string): Promise<boolean> {
    const user = await this.vendorRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return false;
    }

    return true;
  }

  public async create(userDto: RegisterUserDto): Promise<IUsers> {
    try {
      return await this.vendorRepository.save(userDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  findAll() {
    return this.vendorRepository.find();
  }
  findAllActive() {
    return this.vendorRepository.find({
      where: { vendorState: In([VendorStateEnum.VERIFIED]) },
    });
  }

  findAllInactive() {
    return this.vendorRepository.find({
      where: {
        vendorState: In([
          VendorStateEnum.UNVERIFIED,
          VendorStateEnum.SUSPENDED,
          VendorStateEnum.DISABLED,
        ]),
      },
    });
  }
  async updateVendorStatus(
    vendorId: string,
    updateVendorStatus: UpdateVendorStatusDto,
  ) {
    const vendor = await this.vendorRepository.findOne(vendorId);
    if (!vendor) throw new NotFoundException('Vendor not found');
    vendor.vendorState = updateVendorStatus.status;
    const updatedVendor = await this.vendorRepository.save(vendor);
    if (updatedVendor) this.eventEmitter.emit('vendor.status.updated', {
      user: updatedVendor.id,
      status: updatedVendor.vendorState,
      type: NotificationTypeEnum.USER,
      target: NotificationTargetEnum.USER,
      userIds: [updatedVendor.id],
    } as VendorStatusUpdatedEvent);
  }

  async findById(id) {
    const fetchedVendor = await this.vendorRepository.findOne(id, {
      relations: [
        'businessCountry',
        'businessState',
        'identityFront',
        'identityBack',
        'statementDocument',
      ],
    });
    if (!fetchedVendor) {
      throw new NotFoundException('vendor not found');
    }
    delete fetchedVendor.password;
    return fetchedVendor;
  }
  async updatePerInfo(
    vendorId: string,
    updatePersonnalInfo: UpdatePersonnalInfoDto,
  ) {
    const vendor = await this.vendorRepository.findOne(vendorId);
    if (!vendor) throw new NotFoundException('vendor not found');
    vendor.firstName = updatePersonnalInfo.firstName;
    vendor.lastName = updatePersonnalInfo.lastName;
    vendor.dateBirth = updatePersonnalInfo.dateBirth;
    vendor.phone = updatePersonnalInfo.phone;

    return this.vendorRepository.save(vendor);
  }
  async updateBusInfo(
    vendorId: string,
    updateBusinessInfo: UpdateBusinessInfoDto,
  ) {
    const vendor = await this.vendorRepository.findOne(vendorId);
    if (!vendor) throw new NotFoundException('vendor not found');
    vendor.businessInfo.businessName = updateBusinessInfo.businessName;
    vendor.businessInfo.numberCompany = updateBusinessInfo.numberCompany;
    vendor.businessInfo.storeName = updateBusinessInfo.storeName;
    vendor.businessInfo.storeDescription = updateBusinessInfo.storeDescription;
    vendor.businessAdress.adressLine = updateBusinessInfo.adressLine;
    vendor.businessAdress.adressLine2 = updateBusinessInfo.adressLine2;
    vendor.businessAdress.postalCode = updateBusinessInfo.postalCode;
    vendor.businessAdress.city = updateBusinessInfo.city;
    vendor.businessType = updateBusinessInfo.businessType;

    return this.vendorRepository.save(vendor);
  }

  async updateVendorDocument(
    vendorId: string,
    updateVendorDocumentDto: UpdateVendorDocumentDto,
  ) {
    const vendor = await this.vendorRepository.findOne(vendorId, {
      relations: [
        'identityFront',
        'identityBack',
        'statementDocument',
      ],
    });
    if (!vendor) throw new NotFoundException('vendor not found');
    if (updateVendorDocumentDto.statement) vendor.statementDocument = updateVendorDocumentDto.statement;
    if (updateVendorDocumentDto.identityFront) vendor.identityFront = updateVendorDocumentDto.identityFront;
    if (updateVendorDocumentDto.identityBack) vendor.identityBack = updateVendorDocumentDto.identityBack;
    return this.vendorRepository.save(vendor);
  }

  async updateVendorBankAccount(
    vendorId: string,
    updateBankInfoDto: UpdateBankInfoDto,
  ) {
    const vendor = await this.vendorRepository.findOne(vendorId);
    if (!vendor) throw new NotFoundException('vendor not found');
    vendor.account.accountNumber = updateBankInfoDto.accountNumber;
    vendor.account.ibanNumber = updateBankInfoDto.ibanNumber;
    vendor.account.bankName = updateBankInfoDto.bankName;
    
    return this.vendorRepository.save(vendor);
  }
}
