import { Module } from '@nestjs/common';
import { PayoutService } from './payout.service';
import { PayoutController } from './payout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayoutRepository } from './repositories/payout.repository';
import { Payout } from './entities/payout.entity';
import { VendorRepository } from 'src/users/repositories/vendor.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PayoutRepository, Payout, VendorRepository]),
    UsersModule,
  ],
  controllers: [PayoutController],
  providers: [PayoutService],
  exports: [PayoutService],
})
export class PayoutModule {}
