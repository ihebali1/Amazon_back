import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { IsVendorActiveGuard } from 'src/shared/guards/is-vendor-active.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { Users } from 'src/users/entities/users.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateShippingStatusDto } from '../dto/update-shipping-status.dto';
import { OrderStatusEnum } from '../enums/order-staus.enum';
import { OrderProductService } from '../services/order.service';

@ApiTags('Order')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderProductService: OrderProductService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  find() {
    return this.orderProductService.findAll();
  }

  //Create order
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@CurrentUser() user: Users, @Body() createOrderDto: CreateOrderDto) {
    return this.orderProductService.create(user.id, createOrderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('clients/mine')
  findClientOrders(@CurrentUser() user: Users) {
    return this.orderProductService.findAllByClient(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('statistics-vendor/mine')
  findVendorOrderStatistics(@CurrentUser() user: Users) {
    return this.orderProductService.getVendorOrderStatistics(user.id);
  }


  @Get('product-buyable')
  findOrderedTogetherProducts(@Query('id') id: string ) {
    return this.orderProductService.findOrderByProduct(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('vendors/mine')
  findVendorOrders(@CurrentUser() user: Users) {
    return this.orderProductService.findAllByVendor(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderProductService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/vendor')
  findVendorOrder(@Param('id') id: string) {
    return this.orderProductService.findVendorOrder(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/shipping/indelivery')
  setOrderStatusToIndelivery(@Param('id') id: string) {
    return this.orderProductService.updateOrderShippingStatus(
      id,
      OrderStatusEnum.INDELIVERY,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/shipping/delivered')
  setOrderStatusToDelivered(@Param('id') id: string) {
    return this.orderProductService.updateOrderShippingStatus(
      id,
      OrderStatusEnum.DELIVERED,
    );
  }

  @UseGuards(JwtAuthGuard, IsVendorActiveGuard)
  @Patch(':id/shipping')
  updateShippingStatus(
    @Param('id') id: string,
    @Body() updateShippingStatusDto: UpdateShippingStatusDto,
  ) {
    return this.orderProductService.updateShippingStatus(
      id,
      updateShippingStatusDto,
    );
  }
}
