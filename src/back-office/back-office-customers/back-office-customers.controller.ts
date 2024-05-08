import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequiredPermissions } from 'src/permission/decorators/required-premission.decorator';
import { Permissions } from 'src/permission/enums/permissions.enum';
import { AdminGuard } from 'src/shared/guards/admin.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/shared/guards/permission.guard';
import { UpdateCustomerStatusDto } from 'src/users/dto/update-customer-status.dto';
import { ClientService } from 'src/users/services/client.service';

@UseGuards(JwtAuthGuard, AdminGuard, PermissionGuard)
@ApiTags('Back-office-customers')
@Controller('back-office-customers')
export class BackOfiiceCustomersController {
  constructor(private clientService: ClientService) {}

  @RequiredPermissions(Permissions.MANAGE_CUSTOMER)
  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @RequiredPermissions(Permissions.MANAGE_CUSTOMER)
  @Get(':id')
  find(@Param('id') id: string) {
    return this.clientService.findClientById(id);
  }

  @RequiredPermissions(Permissions.MANAGE_CUSTOMER)
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() { isActive }: UpdateCustomerStatusDto,
  ) {
    return this.clientService.updateStatus(id, isActive);
  }
}
