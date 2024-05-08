import { Module } from '@nestjs/common';
import { SubscriptionModule } from 'src/subscription/subscription.module';
import { BackOfficeSubscriptionController } from './back-office-subsciption.controller';

@Module({
  imports: [SubscriptionModule],
  controllers: [BackOfficeSubscriptionController],
})
export class BackOfficeSubscriptionsModule {}
