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
import { RequiredPermissions } from 'src/permission/decorators/required-premission.decorator';
import { Permissions } from 'src/permission/enums/permissions.enum';
import { FindByTypeDto } from 'src/products/dto/find-by-type.dto';
import { FindProductsDto } from 'src/products/dto/find-products-dto';
import { UpdateProductStatusDto } from 'src/products/dto/update-product-status.dto';
import { ProductsService } from 'src/products/services/products.service';
import { AdminGuard } from 'src/shared/guards/admin.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/shared/guards/permission.guard';

@UseGuards(JwtAuthGuard, AdminGuard, PermissionGuard)
@ApiTags('Back-Office-Products')
@Controller('back-office-products')
export class BackOfficeProductsController {
  constructor(private readonly productService: ProductsService) {}

  // Get product list
  @RequiredPermissions(Permissions.MANAGE_PRODUCT)
  @Get()
  findAll(@Query() findProductsFilter: FindProductsDto) {
    return this.productService.findAll(findProductsFilter);
  }

  @RequiredPermissions(Permissions.MANAGE_PRODUCT)
  @Get(':id')
  findOne(@Param('id') id: string, @Query() findByTypeDto: FindByTypeDto) {
    return this.productService.findOne(id, findByTypeDto);
  }

  @RequiredPermissions(Permissions.MANAGE_PRODUCT)
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateProductStatusDto: UpdateProductStatusDto,
  ) {
    return this.productService.updateStatus(id, updateProductStatusDto);
  }
}
