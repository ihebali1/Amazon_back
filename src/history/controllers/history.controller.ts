import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { Client } from 'src/users/entities/users.entity';
import { CreateProductViewHistoryDto } from '../dto/create-product-view-history.dto';
import { HistoryService } from '../services/history.service';

@ApiTags('History')
@UseGuards(JwtAuthGuard)
@Controller('histories')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get('products')
  findAll(@CurrentUser() user: Client) {
    return this.historyService.findAllProductViewHistoryByClient(user.id);
  }

  @Post('products')
  create(
    @CurrentUser() user: Client,
    @Body() createProductViewHistoryDto: CreateProductViewHistoryDto,
  ) {
    return this.historyService.createProductViewHistory(
      user.id,
      createProductViewHistoryDto,
    );
  }
}
