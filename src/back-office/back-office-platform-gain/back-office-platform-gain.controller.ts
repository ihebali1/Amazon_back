import {
    Controller,
    Get,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GainHistoryService } from 'src/gain/services/gain-history.service';
import { RequiredPermissions } from 'src/permission/decorators/required-premission.decorator';
import { Permissions } from 'src/permission/enums/permissions.enum';
import { AdminGuard } from 'src/shared/guards/admin.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/shared/guards/permission.guard';

@ApiTags('Back-Office-Platform-Gain')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, AdminGuard, PermissionGuard)
@Controller('back-office-platform-gains')
export class BackOfficePlatformGainController {
    constructor(private readonly gainHistoryService: GainHistoryService) { }

    @Get('statistics')
    findPlatformEarningStats() {
        return this.gainHistoryService.getPlatformTotalGains();
    }

    @RequiredPermissions(Permissions.VIEW_PLATFORM_REVENUE)
    @Get()
    findAll() {
        return this.gainHistoryService.findAll();
    }
}
