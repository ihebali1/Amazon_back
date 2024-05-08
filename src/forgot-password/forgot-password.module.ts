import { Module } from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import { ForgotPasswordController } from './forgot-password.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entity';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { Admin } from 'src/users/entities/admin.entity';
import { AdminRepository } from 'src/users/repositories/admin.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, UsersRepository, Admin, AdminRepository]),
  ],
  providers: [ForgotPasswordService],
  controllers: [ForgotPasswordController],
})
export class ForgotPasswordModule {}
