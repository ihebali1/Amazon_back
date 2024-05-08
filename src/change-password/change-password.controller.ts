import {
  Controller,
  Post,
  Body,
  UseGuards,
  Res,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { ChangePasswordService } from '../change-password/change-password.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { Users } from 'src/users/entities/users.entity';
import { Admin } from 'src/users/entities/admin.entity';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Authentification')
@Controller('auth/change-password')
export class ChangePasswordController {
  constructor(private readonly changePasswordService: ChangePasswordService) {}

  @Patch()
  public async changePassword(
    @CurrentUser() user: Users,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<any> {
    await this.changePasswordService.updatePassword(user.id, changePasswordDto);
  }
  @Patch('/admin')
  public async changePasswordAdmin(
    @CurrentUser() admin: Admin,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<any> {
    await this.changePasswordService.updatePasswordAdmin(
      admin.id,
      changePasswordDto,
    );
  }
}
