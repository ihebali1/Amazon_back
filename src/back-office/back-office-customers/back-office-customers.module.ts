import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { BackOfiiceCustomersController } from './back-office-customers.controller';

@Module({
  imports: [UsersModule],
  controllers: [BackOfiiceCustomersController],
})
export class BackOfficeCustomersModule {}
