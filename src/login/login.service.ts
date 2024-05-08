import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUsers } from '../users/interfaces/users.interface';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt.payload';
import { LoginDto } from './dto/login.dto';
import { VendorService } from 'src/users/services/vendor.service';
import { ClientService } from 'src/users/services/client.service';
import { AdminService } from 'src/users/services/admin.service';
import { Admin } from 'src/users/entities/admin.entity';
import { CreateTransporterDto } from 'src/transporter/dto/create-transporter.dto';
import { TransporterService } from 'src/transporter/transporter.service';
import { TransporterLoginDto } from './dto/transporter-login.dto';
import { Transporter, Vendor } from 'src/users/entities/users.entity';

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    private vendorService: VendorService,
    private clientService: ClientService,
    private adminService: AdminService,
    private transporterService: TransporterService,
  ) { }

  private async validateVendor(loginDto: LoginDto): Promise<IUsers> {
    return await this.vendorService.findByEmail(loginDto.email);
  }

  private async validateClient(loginDto: LoginDto): Promise<IUsers> {
    return await this.clientService.findByEmail(loginDto.email);
  }
  private async validateAdmin(loginDto: LoginDto): Promise<Admin> {
    return await this.adminService.findByEmail(loginDto.email);
  }
  private async validateTransporter(
    loginDto: TransporterLoginDto,
  ): Promise<Transporter> {
    return await this.transporterService.findByPhone(loginDto.phone);
  }

  public async loginAdmin(
    loginDto: LoginDto,
  ): Promise<any | { status: number; message: string }> {
    return this.validateAdmin(loginDto).then((adminData) => {
      if (!adminData) {
        throw new NotAcceptableException(
          'هذا البريد الإلكتروني لا يطابق أي حساب في نظامنا',
        );
      }

      const passwordIsValid = bcrypt.compareSync(
        loginDto.password,
        adminData.password,
      );

      if (!passwordIsValid == true) {
        throw new NotAcceptableException('فشل عملية الدخول. كلمة مرور خاطئة');
      }

      const payload = {
        email: adminData.email,
        id: adminData.id,
        role: adminData.role,
        managementPack: adminData.managementPack,
        fullName: `${adminData.firstName} ${adminData.lastName}`
      };

      const accessToken = this.jwtService.sign(payload);

      return {
        expiresIn: 3600,
        accessToken: accessToken,
        admin: payload,
        status: 200,
      };
    });
  }

  public async loginVendor(
    loginDto: LoginDto,
  ): Promise<any | { status: number; message: string }> {
    return this.validateVendor(loginDto).then((userData) => {
      if (!userData) {
        throw new NotAcceptableException(
          'هذا البريد الإلكتروني لا يطابق أي حساب في نظامنا',
        );
      }

      const passwordIsValid = bcrypt.compareSync(
        loginDto.password,
        userData.password,
      );

      if (!passwordIsValid == true) {
        throw new NotAcceptableException('فشل عملية الدخول. كلمة مرور خاطئة');
      }

      const payload = {
        name: userData.firstName + ' ' + userData.lastName,
        email: userData.email,
        id: userData.id,
        isVerificationFullfilled: (userData as Vendor).isVerificationFullfilled
      };

      const accessToken = this.jwtService.sign(payload);

      return {
        expiresIn: 3600,
        accessToken: accessToken,
        user: payload,
        status: 200,
      };
    });
  }

  public async loginTransporter(
    loginDto: TransporterLoginDto,
  ): Promise<any | { status: number; message: string }> {
    return this.validateTransporter(loginDto).then((transporterData) => {
      if (!transporterData) {
        console.log(transporterData);
        throw new UnauthorizedException();
      }
      const passwordIsValid = bcrypt.compareSync(
        loginDto.password,
        transporterData.password,
      );
      if (!passwordIsValid == true) {
        throw new UnauthorizedException('فشلت المصادقة كلمة مرور خاطئة');
      }
      const payload = {
        name: transporterData.firstName + ' ' + transporterData.lastName,
        email: transporterData.email,
        id: transporterData.id,
      };
      const accessToken = this.jwtService.sign(payload);

      return {
        expiresIn: 3600,
        accessToken: accessToken,
        trans: payload,
        status: 200,
      };
    });
  }

  public async loginClient(
    loginDto: LoginDto,
  ): Promise<any | { status: number; message: string }> {
    return this.validateClient(loginDto).then((userData) => {
      if (!userData) {
        throw new NotAcceptableException(
          'هذا البريد الإلكتروني لا يطابق أي حساب في نظامنا',
        );
      }

      const passwordIsValid = bcrypt.compareSync(
        loginDto.password,
        userData.password,
      );

      if (!passwordIsValid == true) {
        throw new NotAcceptableException('فشل عملية الدخول. كلمة مرور خاطئة');
      }

      const payload = {
        name: userData.firstName + ' ' + userData.lastName,
        email: userData.email,
        id: userData.id,
      };

      const accessToken = this.jwtService.sign(payload);

      return {
        expiresIn: 3600,
        accessToken: accessToken,
        user: payload,
        status: 200,
      };
    });
  }

  public async validateUserByJwt(payload: JwtPayload) {
    // This will be used when the user has already logged in and has a JWT
    const user = await this.vendorService.findByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException();
    }
    return this.createJwtPayload(user);
  }

  protected createJwtPayload(user) {
    const data: JwtPayload = {
      email: user.email,
      id: user.id,
    };

    const jwt = this.jwtService.sign(data);

    return {
      expiresIn: 3600,
      token: jwt,
      id: data.id,
    };
  }
}
