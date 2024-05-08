import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { IncomeService } from '../services/income.service';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { Users } from 'src/users/entities/users.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Income')
@Controller('incomes')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.incomeService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('vendor-income-statistics')
  getIncomeStatistics(@CurrentUser() user: Users) {
    try {
      return this.incomeService.getIncomeStatisticsByDate(user.id);
    } catch (error) {
      console.log(error);
    }
    
  }

  @UseGuards(JwtAuthGuard)
  @Get('vendors')
  findAllByVendor(@CurrentUser() user: Users) {
    return this.incomeService.findAllByVendor(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incomeService.findOne(id);
  }
}
