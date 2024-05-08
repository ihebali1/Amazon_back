import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { UpdateNotificationDto } from '../dto/update-notification.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { Users } from 'src/users/entities/users.entity';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { Admin } from 'src/users/entities/admin.entity';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Notification')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('user/mine')
  findUserNotifications(
    @CurrentUser() user: Users,
    @Query('limit', new ParseIntPipe()) limit: number,
  ) {
    return this.notificationService.findUserNotifications(user.id, limit);
  }

  @Get('admin/mine')
  findAdminNotifications(
    @CurrentUser() admin: Admin,
    @Query('limit', new ParseIntPipe()) limit: number,
  ) {
    return this.notificationService.findAdminNotifications(admin.id, limit);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationService.updateIsSeen(id, updateNotificationDto.target);
  }
}
