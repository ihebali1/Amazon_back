import { Injectable, NotFoundException } from '@nestjs/common';
import { CountryRepository } from 'src/countries/repositories/country.repository';
import { VendorRepository } from 'src/users/repositories/vendor.repository';
import { CreateBillingDto } from '../dto/create-billing.dto';
import { CreateBusinessInfoDto } from '../dto/create-business-info.dto';
import { CreateMarketPlaceDto } from '../dto/create-market-place.dto';
import { CreatePersonalInfoDto } from '../dto/create-personal-info.dto';
import { CreateSellerInfoDto } from '../dto/create-seller-info.dto';
import { CreateStoreDto } from '../dto/create-store.dto';
import { UpdateVerificationDto } from '../dto/update-verification.dto';

@Injectable()
export class VerificationVendorService {
  constructor(
    private vendorRepository: VendorRepository,
    private countryRepository: CountryRepository,
  ) {}

  public async findById(VendorId: string) {
    const vendor = await this.vendorRepository.findOne({
      where: {
        id: VendorId,
      },
    });

    if (!vendor) {
      throw new NotFoundException(`User #${VendorId} not found`);
    }

    return vendor;
  }

  public async businessInfo(
    vendorId: string,
    businessInfoDto: CreateBusinessInfoDto,
  ) {
    const vendor = await this.vendorRepository.findOne(vendorId);
    if (!vendor) {
      throw new NotFoundException('user not found');
    }
    vendor.businessType = businessInfoDto.businessType;
    vendor.businessInfo.businessName = businessInfoDto.businessName;
    vendor.businessCountry = businessInfoDto.businessCountry;
    vendor.isBusinessInfoFullfilled = true;
    const updatedVendor = await this.vendorRepository.save(vendor);
    delete updatedVendor.password;
    return updatedVendor;
  }

  public async sellerInfo(
    vendorId: string,
    createSellerInfoDto: CreateSellerInfoDto,
  ) {
    const Seller = await this.vendorRepository.findOne(vendorId, {
      relations: ['businessState'],
    });
    if (!Seller) {
      throw new NotFoundException('user not found');
    }
    Seller.businessInfo.numberCompany = createSellerInfoDto.numberCompany;
    Seller.businessAdress.adressLine = createSellerInfoDto.adressLine;
    Seller.businessAdress.adressLine2 = createSellerInfoDto.adressLine2;
    Seller.businessAdress.city = createSellerInfoDto.city;
    Seller.businessAdress.postalCode = createSellerInfoDto.postalCode;
    Seller.phone = createSellerInfoDto.phone;
    Seller.businessState = createSellerInfoDto.state;
    Seller.verificationLanguage = createSellerInfoDto.verificationLanguage;
    Seller.isSellerInfoFullfilled = true;
    const updatedVendorSeller = await this.vendorRepository.save(Seller);
    delete updatedVendorSeller.password;
    return updatedVendorSeller;
  }

  public async sendVerificationDocument(
    vendorId: string,
    updateVerification: UpdateVerificationDto,
  ) {
    const seller = await this.vendorRepository.findOne(vendorId, {
      relations: ['identityBack', 'identityFront', 'statementDocument'],
    });
    if (!seller) {
      throw new NotFoundException('user not found');
    }
    seller.identityBack = updateVerification.identityBack;
    seller.identityFront = updateVerification.identityFront;
    seller.statementDocument = updateVerification.statementDocument;
    seller.isVerificationFullfilled = true;

    const updatedVendorSeller = await this.vendorRepository.save(seller);
    delete updatedVendorSeller.password;
    return updatedVendorSeller;
  }

  public async personalInfo(
    vendorId: string,
    createPersonalInfoDto: CreatePersonalInfoDto,
  ) {
    const Personal = await this.vendorRepository.findOne(vendorId);
    if (!Personal) {
      throw new NotFoundException('user not found');
    }
    Personal.personnalInfo.personnalCity = createPersonalInfoDto.personalCity;
    Personal.personnalInfo.proofidentity = createPersonalInfoDto.proofidentity;
    Personal.dateBirth = createPersonalInfoDto.dateBirth;
    Personal.isPersonalInfoFullfilled = true;
    const updatedVendorSeller = await this.vendorRepository.save(Personal);
    delete updatedVendorSeller.password;
    return updatedVendorSeller;
  }

  public async marketPlace(
    vendorId: string,
    createMarketPlaceDto: CreateMarketPlaceDto,
  ) {
    const Personal = await this.vendorRepository.findOne(vendorId);
    if (!Personal) {
      throw new NotFoundException('user not found');
    }
    Personal.isMarketPlaceFullfilled = true;
    const updatedVendorSeller = await this.vendorRepository.save(Personal);
    delete updatedVendorSeller.password;
    return updatedVendorSeller;
  }
  public async billing(vendorId: string, createBillingDto: CreateBillingDto) {
    const personal = await this.vendorRepository.findOne(vendorId);
    if (!personal) {
      throw new NotFoundException('user not found');
    }

    personal.account.accountNumber = createBillingDto.accountNumber;
    personal.account.bankName = createBillingDto.bankName;
    personal.account.ibanNumber = createBillingDto.iban;

    personal.isBillingFullfilled = true;
    const updatedVendorBilling = await this.vendorRepository.save(personal);
    delete updatedVendorBilling.password;
    return updatedVendorBilling;
  }

  public async store(vendorId: string, createStoreDto: CreateStoreDto) {
    const Personal = await this.vendorRepository.findOne(vendorId);
    if (!Personal) {
      throw new NotFoundException('user not found');
    }
    Personal.businessInfo.storeName = createStoreDto.storeName;
    Personal.businessInfo.storeDescription = createStoreDto.storeDescription;
    Personal.isStoreFullfilled = true;
    const updatedVendorStore = await this.vendorRepository.save(Personal);
    delete updatedVendorStore.password;
    return updatedVendorStore;
  }
  findAll() {
    return this.countryRepository.find();
  }
}
