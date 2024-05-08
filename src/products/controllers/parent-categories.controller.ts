import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParentCategoriesService } from '../services/parent-categories.service';

@ApiTags('Child-Category')
@Controller('parent-categories')
export class ParentCategoriesController {
  constructor(
    private readonly parentCategoriesService: ParentCategoriesService,
  ) {}

  @Get()
  findAll() {
    return this.parentCategoriesService.findAllOrdered();
  }
}
