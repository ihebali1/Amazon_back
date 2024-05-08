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
import { RequiredPermissions } from 'src/permission/decorators/required-premission.decorator';
import { Permissions } from 'src/permission/enums/permissions.enum';
import { CreateDepartmentDto } from 'src/products/dto/create-department.dto';
import { UpdateDepartmentDto } from 'src/products/dto/update-department.dto';
import { DepartmentsService } from 'src/products/services/departments.service';
import { AdminGuard } from 'src/shared/guards/admin.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/shared/guards/permission.guard';

@UseGuards(JwtAuthGuard, AdminGuard, PermissionGuard)
@ApiTags('Back-office-departments')
@Controller('back-office-departments')
export class BackOfiiceDepartmentsController {
  constructor(private readonly departmentService: DepartmentsService) {}

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Get(':id/available-parent-categories')
  findAvailableParentCategories(@Param('id') id: string) {
    return this.departmentService.findAvailableParentCategories(id);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(id);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentService.update(id, updateDepartmentDto);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(id);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Patch(':id/add/:parentId')
  addParentCategory(
    @Param('id') id: string,
    @Param('parentId') parentId: string,
  ) {
    return this.departmentService.addParentCategory(id, parentId);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Patch(':id/remove/:parentId')
  removeParentCategory(
    @Param('parentId') parentId: string,
    @Param('id') id: string,
  ) {
    return this.departmentService.removeParentCategory(id, parentId);
  }

}
