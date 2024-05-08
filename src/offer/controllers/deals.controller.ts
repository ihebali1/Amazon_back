import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { IsVendorActiveGuard } from 'src/shared/guards/is-vendor-active.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { Users } from 'src/users/entities/users.entity';
import { CreateDealsDto } from '../dto/create-deals.dto.';
import { FindDealsDto } from '../dto/find-deals.dto';
import { DealService } from '../services/deal.service';

@ApiTags('Deals')
@Controller('deals')
export class DealsController {
  constructor(private readonly dealService: DealService) {}
  @UseGuards(JwtAuthGuard, IsVendorActiveGuard)
  @Post()
  create(@Body() createDealDto: CreateDealsDto, @CurrentUser() user: Users) {
    return this.dealService.create(createDealDto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getDealsByVendor(@CurrentUser() user: Users) {
    return this.dealService.getDealsByVendor(user.id);
  }

  @Get('active-products')
  getActiveDealProducts(@Query() findDealsFilter: FindDealsDto) {
    return this.dealService.getActiveDealsProducts(findDealsFilter);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dealService.getDealFullDetails(id);
  }
}
