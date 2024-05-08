import { Module } from '@nestjs/common';
import { GainModule } from 'src/gain/gain.module';
import { PayoutModule } from 'src/payout/payout.module';
import { SharedModule } from 'src/shared/shared.module';
import { BackOfficePlatformGainController } from './back-office-platform-gain.controller';

@Module({
  imports: [GainModule, SharedModule],
  controllers: [BackOfficePlatformGainController],
})
export class BackOfficePlatformGainModule {}
