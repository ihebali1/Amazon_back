import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ForgotPasswordService } from '../forgot-password/forgot-password.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@ApiTags('Authentification')
@Controller('auth/forgot-password')
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @Post()
  public async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<any> {
    return this.forgotPasswordService.forgotPassword(forgotPasswordDto);
  }
  @Post('/admin')
  public async forgotPasswordAdmin(
    @Body() forgetPasswordDto: ForgotPasswordDto,
  ): Promise<any> {
    return this.forgotPasswordService.forgotPasswordAdmin(forgetPasswordDto);
  }
}
