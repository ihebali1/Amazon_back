import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterService } from '../services/register.service';
import { RegisterUserDto } from '../dto/register-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentification')
@Controller('auth/register/client')
export class RegisterClientController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  public async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<any> {
    return this.registerService.registerClient(registerUserDto);
  }
}
