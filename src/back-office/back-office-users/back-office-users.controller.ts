import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/shared/guards/admin.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/shared/guards/permission.guard';
import { UsersService } from 'src/users/services/users.service';

@UseGuards(JwtAuthGuard, AdminGuard, PermissionGuard)
@ApiTags('Back-Office-Users')
@Controller('back-office-users')
export class BackOfficeUsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('statistics')
  findAll() {
    return this.userService.findUserStatistics();
  }
}
