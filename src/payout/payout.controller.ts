import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PayoutService } from './payout.service';
import { CreatePayoutDto } from './dto/create-payout.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { Users } from 'src/users/entities/users.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsVendorActiveGuard } from 'src/shared/guards/is-vendor-active.guard';

@ApiTags('Payouts')
@ApiBearerAuth()
@Controller('payouts')
export class PayoutController {
  constructor(private readonly payoutService: PayoutService) {}

  @UseGuards(JwtAuthGuard, IsVendorActiveGuard)
  @Post()
  create(@CurrentUser() user: Users, @Body() createPayoutDto: CreatePayoutDto) {
    return this.payoutService.create(user.id, createPayoutDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('mine')
  findVendorPayouts(@CurrentUser() user: Users) {
    return this.payoutService.findVendorPayouts(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payoutService.findOne(id);
  }
}
