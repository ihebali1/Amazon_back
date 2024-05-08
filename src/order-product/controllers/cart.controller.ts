import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { Users } from 'src/users/entities/users.entity';
import { AddToCartDto } from '../dto/add-to-cart.dto';
import { FindShippingCostDto } from '../dto/find-shipping-cost.dto';
import { RemoveFromCartDto } from '../dto/remove-from-cart.dto';
import { UpdateCartDto } from '../dto/update-cart.dto';
import { CartService } from '../services/cart.service';

@ApiTags('Cart')
@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findOne(@CurrentUser() user: Users) {
    return this.cartService.findOneByUserId(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('shipping-cost')
  getShippingCost(
    @CurrentUser() user: Users,
    @Query() findShippingCostDto: FindShippingCostDto,
  ) {
    return this.cartService.getShippingCost(user.id, findShippingCostDto.state);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('remove-product')
  removeProduct(
    @CurrentUser() user: Users,
    @Body() removeFromCartDto: RemoveFromCartDto,
  ) {
    return this.cartService.removeProduct(user.id, removeFromCartDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('add-product')
  addProduct(@CurrentUser() user: Users, @Body() addToCartDto: AddToCartDto) {
    console.log(user);
    return this.cartService.addProduct(user.id, addToCartDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('increase-quantity')
  increaseQuantity(
    @CurrentUser() user: Users,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartService.increaseQuantity(user.id, updateCartDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('decrease-quantity')
  decreaseQuantity(
    @CurrentUser() user: Users,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartService.decreaseQuantity(user.id, updateCartDto);
  }
}
