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
import { CreateChildCategoryDto } from 'src/products/dto/create-child-category.dto';
import { UpdateChildCategoryDto } from 'src/products/dto/update-child-category.dto';
import { ChildCategoriesService } from 'src/products/services/child-categories.service';
import { AdminGuard } from 'src/shared/guards/admin.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/shared/guards/permission.guard';

@UseGuards(JwtAuthGuard, AdminGuard, PermissionGuard)
@ApiTags('Back-office-child-categories')
@Controller('back-office-child-categories')
export class BackOfiiceChildCategoriesController {
  constructor(private readonly childCategoryService: ChildCategoriesService) {}

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Post()
  create(@Body() createChildCategoryDto: CreateChildCategoryDto) {
    return this.childCategoryService.create(createChildCategoryDto);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Get()
  findAll() {
    return this.childCategoryService.findAll();
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Get(':id/available-attribues')
  findAvailableAttributes(@Param('id') id: string) {
    return this.childCategoryService.findAvailableAttributes(id);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Get(':id/available-variations')
  findAvailableVariationThemes(@Param('id') id: string) {
    return this.childCategoryService.findAvailableVariationThemes(id);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.childCategoryService.findOne(id);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChildCategoryDto: UpdateChildCategoryDto,
  ) {
    return this.childCategoryService.update(id, updateChildCategoryDto);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.childCategoryService.remove(id);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Patch(':id/add-variation/:vtId')
  addVariation(@Param('id') id: string, @Param('vtId') vtId: string) {
    return this.childCategoryService.addVariationTheme(id, vtId);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Patch(':id/add/:attributeId')
  addAttribute(
    @Param('id') id: string,
    @Param('attributeId') attributeId: string,
  ) {
    return this.childCategoryService.addAttribute(id, attributeId);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Patch(':id/remove/:attributeId')
  removeAttribute(
    @Param('attributeId') attributeId: string,
    @Param('id') id: string,
  ) {
    return this.childCategoryService.removeAttribute(id, attributeId);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Patch(':id/remove-variation/:vtId')
  removeVariation(@Param('vtId') vtId: string, @Param('id') id: string) {
    return this.childCategoryService.removeVariationTheme(id, vtId);
  }
}
