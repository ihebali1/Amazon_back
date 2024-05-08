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
import { RequiredPermissions } from 'src/permission/decorators/required-premission.decorator';
import { Permissions } from 'src/permission/enums/permissions.enum';
import { CreateFeaturedDepartmentDto } from 'src/products/dto/create-featured-department.dto';
import { DepartmentsService } from 'src/products/services/departments.service';
import { AdminGuard } from 'src/shared/guards/admin.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/shared/guards/permission.guard';

@UseGuards(JwtAuthGuard, AdminGuard, PermissionGuard)
@ApiTags('Back-office-featured-departments')
@Controller('back-office-featured-departments')
export class BackOfiiceFeaturedDepartmentsController {
  constructor(private readonly departmentService: DepartmentsService) {}

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Post()
  create(@Body() createFeaturedDepartmentDto: CreateFeaturedDepartmentDto) {
    return this.departmentService.addFeaturedDepartment(
      createFeaturedDepartmentDto.department,
    );
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.removeFeaturedDepartment(id);
  }
}
