import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductRegistryDetailsDto } from '../dto/create-productRegistryDetails.dto';
import { UpdateProductRegistryDetailsDto } from '../dto/update-productRegistryDetails.dto';
import { ProductRegistryDetailsService } from '../services/productRegistryDetails.service';

@ApiTags('ProductRegistryDetails')
@Controller('productRegistryDetailes')
export class ProductRegistryDetailsController {
  constructor(
    private readonly productRegistryDetailsService: ProductRegistryDetailsService,
  ) {}
  @Post()
  create(
    @Body() createProductRegistryDetailsDto: CreateProductRegistryDetailsDto,
  ) {
    return this.productRegistryDetailsService.creat(
      createProductRegistryDetailsDto,
    );
  }
  @Get()
  findAll() {
    return this.productRegistryDetailsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productRegistryDetailsService.findOne(id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductRegistryDetailsDto: UpdateProductRegistryDetailsDto,
  ) {
    return this.productRegistryDetailsService.update(
      id,
      updateProductRegistryDetailsDto,
    );
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productRegistryDetailsService.remove(id);
  }
}
