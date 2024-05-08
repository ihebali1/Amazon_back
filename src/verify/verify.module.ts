import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorRepository } from 'src/users/repositories/vendor.repository';
import { UsersModule } from 'src/users/users.module';
import { VerifyController } from './verify.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VendorRepository]), UsersModule],
  controllers: [VerifyController],
  providers: [],
})
export class VerifyModule {}
