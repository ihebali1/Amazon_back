import { Controller, Param, UseGuards, Patch, Body, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VerificationVendorService } from '../services/verification-vendor.service';
import { CreateBusinessInfoDto } from '../dto/create-business-info.dto';
import { CreateSellerInfoDto } from '../dto/create-seller-info.dto';
import { CreatePersonalInfoDto } from '../dto/create-personal-info.dto';
import { CreateMarketPlaceDto } from '../dto/create-market-place.dto';
import { CreateBillingDto } from '../dto/create-billing.dto';
import { CreateStoreDto } from '../dto/create-store.dto';
import { UpdateVerificationDto } from '../dto/update-verification.dto';

//@UseGuards(AuthGuard('jwt'))
@ApiTags('Register-Verifications')
@Controller('verifications')
export class VerificationVendorController {
  constructor(
    private readonly verificationVendorService: VerificationVendorService,
  ) {}

  @Patch(':id/business-info')
  businessInfo(
    @Param('id') vendorId: string,
    @Body() businessInfoDto: CreateBusinessInfoDto,
  ) {
    return this.verificationVendorService.businessInfo(
      vendorId,
      businessInfoDto,
    );
  }

  @Patch(':id/seller-info')
  sellerInfo(
    @Param('id') vendorId: string,
    @Body() createSellerInfoDto: CreateSellerInfoDto,
  ) {
    return this.verificationVendorService.sellerInfo(
      vendorId,
      createSellerInfoDto,
    );
  }

  @Patch(':id/personal-info')
  personalInfo(
    @Param('id') vendorId: string,
    @Body() createPersonalInfoDto: CreatePersonalInfoDto,
  ) {
    return this.verificationVendorService.personalInfo(
      vendorId,
      createPersonalInfoDto,
    );
  }

  @Patch(':id/market-Place')
  marketPlace(
    @Param('id') vendorId: string,
    @Body() createMarketPlaceDto: CreateMarketPlaceDto,
  ) {
    return this.verificationVendorService.marketPlace(
      vendorId,
      createMarketPlaceDto,
    );
  }

  @Patch(':id/billing')
  billing(
    @Param('id') vendorId: string,
    @Body() createBillingDto: CreateBillingDto,
  ) {
    return this.verificationVendorService.billing(vendorId, createBillingDto);
  }

  @Patch(':id/store')
  store(@Param('id') vendorId: string, @Body() createStoreDto: CreateStoreDto) {
    return this.verificationVendorService.store(vendorId, createStoreDto);
  }

  @Patch(':id/documents')
  uploadDocuments(
    @Param('id') vendorId: string,
    @Body() updateVerificationDto: UpdateVerificationDto,
  ) {
    return this.verificationVendorService.sendVerificationDocument(
      vendorId,
      updateVerificationDto,
    );
  }

  @Get()
  findAll() {
    return this.verificationVendorService.findAll();
  }
}
