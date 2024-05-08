import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChildCategoriesService } from '../services/child-categories.service';

@ApiTags('Child-Category')
@Controller('child-categories')
export class ChildCategoriesController {
  constructor(
    private readonly childCategoriesService: ChildCategoriesService,
  ) {}

  @Get()
  findAll(@Query('name') name: string) {
    return this.childCategoriesService.findByName(name);
  }
  @Get(':id')
  find(@Param('id') id: string) {
    return this.childCategoriesService.findOneWithDetails(id);
  }
}
