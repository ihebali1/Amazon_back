import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { BackOfficeUsersController } from './back-office-users.controller';

@Module({
    imports: [UsersModule],
    controllers: [BackOfficeUsersController],
})
export class BackOfficeUsersModule { }
