import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserSubscriptionService } from './user-subscription.service';
import { CreateUserSubscriptionDto } from './dto/create-user-subscription.dto';
import { UpdateUserSubscriptionDto } from './dto/update-user-subscription.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { Users } from 'src/users/entities/users.entity';

@Controller('user-subscription')
@UseGuards(JwtAuthGuard)
export class UserSubscriptionController {
  constructor(private readonly userSubscriptionService: UserSubscriptionService) { }

  @Post()
  create(@CurrentUser() user: Users, @Body() createUserSubscriptionDto: CreateUserSubscriptionDto) {
    return this.userSubscriptionService.create(createUserSubscriptionDto, user.id);
  }

  @Get('active-subscription')
  findUserActiveSubscription(@CurrentUser() user: Users) {
    return this.userSubscriptionService.findUserActiveSubscription(user.id);
  }

  @Get()
  findAll() {
    return this.userSubscriptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userSubscriptionService.findOne(id);
  }

  @Patch(':id/cancel')
  cancelUserSubscription(@Param('id') id: string) {
    return this.userSubscriptionService.cancelSubscription(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userSubscriptionService.remove(+id);
  }
}
