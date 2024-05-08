import { Module } from '@nestjs/common';
import { UserSubscriptionService } from './user-subscription.service';
import { UserSubscriptionController } from './user-subscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSubscriptionRepository } from './repositories/user-subscription.repository';
import { SubscriptionRepository } from 'src/subscription/repositories/subscription.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserSubscriptionRepository,
      SubscriptionRepository,
    ]),
  ],
  controllers: [UserSubscriptionController],
  providers: [UserSubscriptionService],
  exports: [
    TypeOrmModule, UserSubscriptionService
  ],
})
export class UserSubscriptionModule {}
