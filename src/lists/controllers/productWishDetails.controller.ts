import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { CreateproductWishDetailsDto } from '../dto/create-productWishDetails.dto';
import { ProductWishDetailsService } from '../services/productWishDetails.service';

@ApiTags('ProductWishDetail')
@UseGuards(JwtAuthGuard)
@Controller('product-wish-details')
export class ProductWishDetailsController {
  constructor(
    private readonly productWishDetailsService: ProductWishDetailsService,
  ) {}

  @Post()
  create(@Body() createproductWishDetailsDto: CreateproductWishDetailsDto) {
    return this.productWishDetailsService.create(createproductWishDetailsDto);
  }

  @Get()
  findAll() {
    return this.productWishDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productWishDetailsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productWishDetailsService.remove(id);
  }
}
