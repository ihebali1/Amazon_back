import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from '../login/dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { TransporterLoginDto } from './dto/transporter-login.dto';

@ApiTags('Authentification')
@Controller('auth/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('vendor')
  public async loginVendor(@Body() loginDto: LoginDto): Promise<any> {
    return this.loginService.loginVendor(loginDto);
  }

  @Post('client')
  public async loginClient(@Body() loginDto: LoginDto): Promise<any> {
    return this.loginService.loginClient(loginDto);
  }

  @Post('admin')
  public async loginAdmin(@Body() loginDto: LoginDto): Promise<any> {
    return this.loginService.loginAdmin(loginDto);
  }
  @Post('transporter')
  public async loginTransporter(
    @Body() loginDto: TransporterLoginDto,
  ): Promise<any> {
    return this.loginService.loginTransporter(loginDto);
  }
}
