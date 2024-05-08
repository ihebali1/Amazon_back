import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DepartmentsService } from '../services/departments.service';

@ApiTags('Department')
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentService: DepartmentsService) {}

  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  @Get('featured-products')
  findFeaturedProducts() {
    return this.departmentService.findWeekTopList();
  }

  @Get('top-week')
  findTopWeek() {
    return this.departmentService.findWeekTopList();
  }

  @Get('featured')
  findFeaturedDepartments() {
    return this.departmentService.findWeekTopList();
  }

  @Get('child-categories')
  findAllWithChildCategories() {
    return this.departmentService.findAllWithChildCategories();
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.departmentService.findOne(id);
  }
}
