import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionController } from './controllers/subsciption.controller';
import { SubscriptionRepository } from './repositories/subscription.repository';
import { SubscriptionService } from './services/subscription.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionRepository])],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  exports: [
    TypeOrmModule, SubscriptionService
  ],
})
export class SubscriptionModule { }
