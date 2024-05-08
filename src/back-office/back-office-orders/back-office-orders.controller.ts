import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateOrderTransporterDto } from 'src/order-product/dto/update-order-transporter.dto';
import { OrderProductService } from 'src/order-product/services/order.service';
import { RequiredPermissions } from 'src/permission/decorators/required-premission.decorator';
import { Permissions } from 'src/permission/enums/permissions.enum';
import { AdminGuard } from 'src/shared/guards/admin.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/shared/guards/permission.guard';

@ApiTags('Back-office-orders')
@Controller('back-office-orders')
@UseGuards(JwtAuthGuard, AdminGuard, PermissionGuard)
export class BackOfiiceOrdersController {
  constructor(private orderProductService: OrderProductService) {}

  @RequiredPermissions(Permissions.MANAGE_ORDER)
  @Get(':id')
  remove(@Param('id') id: string) {
    return this.orderProductService.findOne(id);
  }

  @RequiredPermissions(Permissions.MANAGE_ORDER)
  @Get()
  findAll() {
    return this.orderProductService.findAll();
  }

  @RequiredPermissions(Permissions.MANAGE_ORDER)
  @Patch(':id/shipping')
  setTransporter(@Param('id') id: string) {
    return this.orderProductService.deliverOrder(id);
  }
}
