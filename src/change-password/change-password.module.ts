import { Module } from '@nestjs/common';
import { ChangePasswordController } from './change-password.controller';
import { ChangePasswordService } from './change-password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/services/users.service';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { Admin } from 'src/users/entities/admin.entity';
import { AdminRepository } from 'src/users/repositories/admin.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, UsersRepository, Admin, AdminRepository]),
  ],
  controllers: [ChangePasswordController],
  providers: [ChangePasswordService],
})
export class ChangePasswordModule {}
