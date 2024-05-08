import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { Users } from 'src/users/entities/users.entity';
import { CreateWishListDto } from '../dto/create-wishList.dto';
import { UpdateWishListDto } from '../dto/update-wishList.dto';
import { WishListService } from '../services/wishList.service';

@ApiTags('WishList')
@UseGuards(JwtAuthGuard)
@Controller('wishlists')
export class WishListController {
  constructor(private readonly wishListService: WishListService) {}
  @Post()
  create(
    @Body() createWishListDto: CreateWishListDto,
    @CurrentUser() user: Users,
  ) {
    return this.wishListService.create(user.id, createWishListDto);
  }
  @Get('mine')
  findMyWishLists(@CurrentUser() user: Users) {
    return this.wishListService.findUserWishLists(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishListService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatewishListDto: UpdateWishListDto,
  ) {
    return this.wishListService.update(id, updatewishListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.wishListService.remove(id);
    } catch (error) {
      console.log(error);
    }
  }
}
