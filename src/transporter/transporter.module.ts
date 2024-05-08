import { Module } from '@nestjs/common';
import { TransporterService } from './transporter.service';
import { TransporterController } from './transporter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransporterRepository } from './repositories/transporter.repository';
import { FileRepository } from 'src/file/repositories/file.repository';
import { OrderRepository } from 'src/order-product/repositories/order.repository';
import { UsersModule } from 'src/users/users.module';
import { Transporter, Users } from 'src/users/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransporterRepository,
      Transporter,
      FileRepository,
      OrderRepository,
      Users,
    ]),
    UsersModule
  ],
  controllers: [TransporterController],
  providers: [TransporterService],
})
export class TransporterModule {}
