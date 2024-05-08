import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { IsVendorActiveGuard } from 'src/shared/guards/is-vendor-active.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { Users } from 'src/users/entities/users.entity';
import { CreatepromotionsDto } from '../dto/create-promotions.dto';
import { PromotionsService } from '../services/promotions.service';
@ApiTags('Promotions')
@Controller('promotions')

export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) { }

  @UseGuards(JwtAuthGuard, IsVendorActiveGuard)
  @Post()
  create(
    @Body() createPromotionsDto: CreatepromotionsDto,
    @CurrentUser() user: Users,
  ) {
    return this.promotionsService.create(createPromotionsDto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findVendorPromotions(@Param('id') id: string, @CurrentUser() user: Users) {
    return this.promotionsService.findVendorPromotions(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findPromotionsById(@Param('id') id: string) {
    return this.promotionsService.findPromotionsById(id);
  }
}
