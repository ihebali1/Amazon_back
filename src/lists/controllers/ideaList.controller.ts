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
import { CreateIdeaListDto } from '../dto/create-ideaList.dto';
import { UpdateIdeaListDto } from '../dto/update-ideaList.dto';
import { IdeaListService } from '../services/ideaList.service';

@ApiTags('IdeaList')
@Controller('ideaLists')
export class IdeaListController {
  constructor(private readonly ideaListService: IdeaListService) {}
  @Post()
  create(@Body() createIdeaListDto: CreateIdeaListDto) {
    return this.ideaListService.creat(createIdeaListDto);
  }
  @Get()
  findAll() {
    return this.ideaListService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ideaListService.findOne(id);
  }
  @Patch(':id/add/:productId')
  addProduct(@Param('id') id: string, @Param('productId') productId: string) {
    return this.ideaListService.addProduct(id, productId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIdeaListDto: UpdateIdeaListDto,
  ) {
    return this.ideaListService.update(id, updateIdeaListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Param('attributeId') productId: string) {
    return this.ideaListService.remove(id, productId);
  }
}
