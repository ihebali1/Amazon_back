import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { IsVendorActiveGuard } from 'src/shared/guards/is-vendor-active.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { Users } from 'src/users/entities/users.entity';
import { CreateCouponsDto } from '../dto/create-coupons.dto';
import { CouponsService } from '../services/coupons.service';

@ApiTags('Coupons')
@Controller('coupons')

export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @UseGuards(JwtAuthGuard, IsVendorActiveGuard)
  @Post()
  create(
    @Body() createCouponsDto: CreateCouponsDto,
    @CurrentUser() user: Users,
  ) {
    return this.couponsService.create(createCouponsDto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findVendorCoupons(@Param('id') id: string, @CurrentUser() user: Users) {
    return this.couponsService.findVendorCoupons(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findCouponsById(@Param('id') id: string) {
    return this.couponsService.findCouponsById(id);
  }
}
