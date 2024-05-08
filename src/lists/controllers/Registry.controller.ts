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
import { CreateRegistryDto } from '../dto/create-registry.dto';
import { CreateSavedItemsDto } from '../dto/create-savedItems.dto';
import { UpdateRegistryDto } from '../dto/update-registry.dto';
import { UpdateSavedItemsDto } from '../dto/update-savedItems.dto';
import { RegistryService } from '../services/registry.service';
import { SavedItemsService } from '../services/savedItems.service';

@ApiTags('Registry')
@Controller('registries')
export class RegistryController {
  constructor(private readonly registryService: RegistryService) {}
  @Post()
  create(@Body() createRegistryDto: CreateRegistryDto) {
    return this.registryService.creat(createRegistryDto);
  }
  @Get()
  findAll() {
    return this.registryService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegistryDto: UpdateRegistryDto,
  ) {
    return this.registryService.update(id, updateRegistryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registryService.remove(id);
  }
}
