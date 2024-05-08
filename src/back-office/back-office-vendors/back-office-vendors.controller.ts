import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderProductService } from 'src/order-product/services/order.service';
import { RequiredPermissions } from 'src/permission/decorators/required-premission.decorator';
import { Permissions } from 'src/permission/enums/permissions.enum';
import { FindVendorProductsDto } from 'src/products/dto/find-vendor-products.dto';
import { ProductsService } from 'src/products/services/products.service';
import { AdminGuard } from 'src/shared/guards/admin.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/shared/guards/permission.guard';
import { UpdateVendorStatusDto } from 'src/users/dto/update.vendor.status.dto';
import { VendorService } from 'src/users/services/vendor.service';

@UseGuards(JwtAuthGuard, AdminGuard, PermissionGuard)
@ApiTags('Back-office-vendors')
@Controller('back-office-vendors')
export class BackOfiiceVendorsController {
  constructor(
    private productService: ProductsService,
    private vendorService: VendorService,
    private orderProductService: OrderProductService,
  ) {}

  @RequiredPermissions(Permissions.MANAGE_SELLER)
  @Get()
  findAll() {
    return this.vendorService.findAll();
  }

  @RequiredPermissions(Permissions.MANAGE_SELLER)
  @Get('active')
  findAllActive() {
    return this.vendorService.findAllActive();
  }

  @RequiredPermissions(Permissions.MANAGE_SELLER)
  @Get('inactive')
  findAllInactive() {
    return this.vendorService.findAllInactive();
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.vendorService.findById(id);
  }

  @RequiredPermissions(Permissions.MANAGE_SELLER)
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateVendorStatusDto: UpdateVendorStatusDto,
  ) {
    return this.vendorService.updateVendorStatus(id, updateVendorStatusDto);
  }

  @RequiredPermissions(Permissions.MANAGE_SELLER)
  @Get(':id/products')
  findVendorProduct(
    @Param('id') id: string,
    @Query() findVendorProductsFilter: FindVendorProductsDto,
  ) {
    return this.productService.findVendorProducts(id, findVendorProductsFilter);
  }

  @RequiredPermissions(Permissions.MANAGE_SELLER)
  @Get(':id/transactions')
  findAllByVendor(@Param('id') id: string) {
    return this.orderProductService.findAllByVendor(id);
  }
}
