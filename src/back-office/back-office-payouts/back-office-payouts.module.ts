import { Module } from '@nestjs/common';
import { PayoutModule } from 'src/payout/payout.module';
import { SharedModule } from 'src/shared/shared.module';
import { BackOfficePayoutsController } from './back-office-payouts.controller';

@Module({
  imports: [PayoutModule, SharedModule],
  controllers: [BackOfficePayoutsController],
})
export class BackOfficePayoutsModule {}
