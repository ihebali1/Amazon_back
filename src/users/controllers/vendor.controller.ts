import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { UpdateBankInfoDto } from '../dto/update-bank-info.dto';
import { UpdateBusinessInfoDto } from '../dto/update-business-info.dto';
import { UpdatePersonnalInfoDto } from '../dto/update-personnal-info.dto';
import { UpdateVendorDocumentDto } from '../dto/update-vendor-document.dto';
import { Users } from '../entities/users.entity';
import { VendorService } from '../services/vendor.service';

@ApiTags('Vendor')
@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) { }
  @UseGuards(JwtAuthGuard)
  @Get('mine')
  findMyDetails(@CurrentUser() user: Users) {
    return this.vendorService.findById(user.id);
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.vendorService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/personnalInfo')
  updatePerInfo(
    @Param('id') id: string,
    @Body() updatePersonnalInfo: UpdatePersonnalInfoDto,
  ) {
    return this.vendorService.updatePerInfo(id, updatePersonnalInfo);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/businessInfo')
  updateBusInfo(
    @Param('id') id: string,
    @Body() updateBusinessInfo: UpdateBusinessInfoDto,
  ) {
    return this.vendorService.updateBusInfo(id, updateBusinessInfo);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/documents')
  updateDocuments(
    @Param('id') id: string,
    @Body() updateVendorDocumentDto: UpdateVendorDocumentDto,
  ) {
    return this.vendorService.updateVendorDocument(id, updateVendorDocumentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/bank-account')
  updateBankAccount(
    @Param('id') id: string,
    @Body() updateBankAccount: UpdateBankInfoDto,
  ) {
    return this.vendorService.updateVendorBankAccount(id, updateBankAccount);
  }

  @Get()
  findAll() {
    return this.vendorService.findAll();
  }
}
