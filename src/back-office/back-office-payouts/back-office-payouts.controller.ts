import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdatePayoutDto } from 'src/payout/dto/update-payout.dto';
import { PayoutService } from 'src/payout/payout.service';
import { RequiredPermissions } from 'src/permission/decorators/required-premission.decorator';
import { Permissions } from 'src/permission/enums/permissions.enum';
import { AdminGuard } from 'src/shared/guards/admin.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/shared/guards/permission.guard';

@ApiTags('Back-Office-Payouts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, AdminGuard, PermissionGuard)
@Controller('back-office-payouts')
export class BackOfficePayoutsController {
  constructor(private readonly payoutService: PayoutService) {}

  @RequiredPermissions(Permissions.MANAGE_PAYOUT)
  @Get()
  findAll() {
    return this.payoutService.findAll();
  }

  @RequiredPermissions(Permissions.MANAGE_PAYOUT)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payoutService.findOne(id);
  }

  @RequiredPermissions(Permissions.MANAGE_PAYOUT)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayoutDto: UpdatePayoutDto) {
    return this.payoutService.updateStatus(id, updatePayoutDto);
  }
}
