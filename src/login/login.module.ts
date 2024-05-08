import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { Users } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/services/users.service';
import { VendorService } from 'src/users/services/vendor.service';
import { VendorRepository } from 'src/users/repositories/vendor.repository';
import { ClientService } from 'src/users/services/client.service';

import { AdminService } from 'src/users/services/admin.service';
import { AdminRepository } from 'src/users/repositories/admin.repository';
import { UsersModule } from 'src/users/users.module';
import { TransporterRepository } from 'src/transporter/repositories/transporter.repository';
import { TransporterService } from 'src/transporter/transporter.service';
import { OrderRepository } from 'src/order-product/repositories/order.repository';
import { FileRepository } from 'src/file/repositories/file.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      Users,
      VendorRepository,
      AdminRepository,
      TransporterRepository,
      OrderRepository,
      FileRepository,
      TransporterRepository,
    ]),
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: process.env.SECRET_KEY_JWT,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
  ],
  providers: [
    LoginService,
    UsersService,
    JwtStrategy,
    VendorService,
    ClientService,
    AdminService,
    TransporterService,
  ],
  controllers: [LoginController],
})
export class LoginModule {}
