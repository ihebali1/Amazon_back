import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { Users } from 'src/users/entities/users.entity';
import { CreatePaymentMethodDto } from '../dto/create-paymentMethod.dto';
import { UpdatePaymentMethodDto } from '../dto/update-PaymentMethod.dto';
import { PaymentMethodService } from '../services/paymentMethod.service';

@ApiTags('Payment Method')
@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.paymentMethodsService.creat(createPaymentMethodDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@CurrentUser() user: Users) {
    return this.paymentMethodsService.findAll(user.stripeId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentMethodsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdatePaymentMethodDto,
  ) {
    return this.paymentMethodsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentMethodsService.remove(id);
  }
}
