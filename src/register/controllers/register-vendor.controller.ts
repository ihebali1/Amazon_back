import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Param,
  Get,
  Put,
} from '@nestjs/common';
import { RegisterService } from '../services/register.service';
import { RegisterUserDto } from '../dto/register-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { OtpDto } from '../dto/otp.dto';

@ApiTags('Authentification')
@Controller('auth/register')
export class RegisterVendorController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('vendor')
  public async register(
    @Res() res,
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<any> {
    try {
      await this.registerService.registerVendor(registerUserDto);

      return res.status(HttpStatus.OK).json({
        message: 'User registration successfully!',
        status: 200,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: err,
        status: 400,
      });
    }
  }
  @Get(':id')
  find(@Param('id') id: string) {
    return this.registerService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() otpDto: OtpDto,
    @Res() res,
  ): Promise<any> {
    try {
      this.registerService.otpVerifed(otpDto);

      return res.status(HttpStatus.OK).json({
        message: 'Correct OTP',
        status: 200,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: err,
        status: 400,
      });
    }
  }
}
