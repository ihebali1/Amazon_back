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
import { CreateSavedItemsDto } from '../dto/create-savedItems.dto';
import { UpdateSavedItemsDto } from '../dto/update-savedItems.dto';
import { SavedItemsService } from '../services/savedItems.service';

@ApiTags('SavedItems')
@Controller('savedItemss')
export class SavedItemsController {
  constructor(private readonly savedItemsService: SavedItemsService) {}
  @Post()
  create(@Body() createSavedItemsDto: CreateSavedItemsDto) {
    return this.savedItemsService.creat(createSavedItemsDto);
  }
  @Get()
  findAll() {
    return this.savedItemsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.savedItemsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSavedItemsDto: UpdateSavedItemsDto,
  ) {
    return this.savedItemsService.update(id, updateSavedItemsDto);
  }

  @Patch(':id/add-product/:productId')
  addProduct(@Param('id') id: string, @Param('productId') productId: string) {
    return this.savedItemsService.addProduct(id, productId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.savedItemsService.remove(id);
  }
}
