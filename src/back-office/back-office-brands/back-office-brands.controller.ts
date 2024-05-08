import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequiredPermissions } from 'src/permission/decorators/required-premission.decorator';
import { Permissions } from 'src/permission/enums/permissions.enum';
import { CreateBrandDto } from 'src/products/dto/create-brand.dto';
import { UpdateBrandDto } from 'src/products/dto/update-brand.dto';
import { BrandService } from 'src/products/services/brand.service';
import { AdminGuard } from 'src/shared/guards/admin.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/shared/guards/permission.guard';

@ApiTags('Back-office-brands')
@Controller('back-office-brands')
@UseGuards(JwtAuthGuard, AdminGuard, PermissionGuard)

export class BackOfiiceBrandsController {
  constructor(private brandService: BrandService) {}

  @RequiredPermissions(Permissions.MANAGE_BRAND)
  @Post()
  createBrand(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @RequiredPermissions(Permissions.MANAGE_BRAND)
  @Patch(':id')
  updateBrand(@Param('id') id: string, @Body() UpdateBrandDto: UpdateBrandDto) {
    return this.brandService.update(id, UpdateBrandDto);
  }

  @RequiredPermissions(Permissions.MANAGE_BRAND)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }

  @RequiredPermissions(Permissions.MANAGE_BRAND)
  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  @RequiredPermissions(Permissions.MANAGE_BRAND)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(id);
  }
}
