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
import { CreateParentCategoryDto } from 'src/products/dto/create-parent-category.dto';
import { UpdateParentCategoryDto } from 'src/products/dto/update-parent-category.dto';
import { ParentCategoriesService } from 'src/products/services/parent-categories.service';
import { AdminGuard } from 'src/shared/guards/admin.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/shared/guards/permission.guard';

@UseGuards(JwtAuthGuard, AdminGuard, PermissionGuard)
@ApiTags('Back-office-parent-categories')
@Controller('back-office-parent-categories')
export class BackOfiiceParentCategoriesController {
  constructor(
    private readonly parentCategoryService: ParentCategoriesService,
  ) {}

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Post()
  create(@Body() createParentCategoryDto: CreateParentCategoryDto) {
    return this.parentCategoryService.create(createParentCategoryDto);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Get()
  findAll() {
    return this.parentCategoryService.findAll();
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Get(':id/available-child-categories')
  findAvailableParentCategories(@Param('id') id: string) {
    return this.parentCategoryService.findAvailableChildCategories(id);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parentCategoryService.findOne(id);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParentCategoryDto: UpdateParentCategoryDto,
  ) {
    return this.parentCategoryService.update(id, updateParentCategoryDto);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parentCategoryService.remove(id);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Patch(':id/add/:childId')
  addChildCategory(@Param('id') id: string, @Param('childId') childId: string) {
    return this.parentCategoryService.addChildCategory(id, childId);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Patch(':id/remove/:childId')
  removeChildCategory(
    @Param('childId') childId: string,
    @Param('id') id: string,
  ) {
    return this.parentCategoryService.removeChildCategory(id, childId);
  }
}
