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
import { CreateVariationThemeDto } from 'src/products/dto/create-variation-theme.dto';
import { UpdateVariationThemeDto } from 'src/products/dto/update-variation-theme.dto';
import { VariationThemesService } from 'src/products/services/variation-themes.service';
import { AdminGuard } from 'src/shared/guards/admin.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/shared/guards/permission.guard';

@UseGuards(JwtAuthGuard, AdminGuard, PermissionGuard)
@ApiTags('Back office variation theme')
@Controller('back-office-variation-themes')
export class BackOfficeVariationThemesController {
  constructor(private readonly variationThemeService: VariationThemesService) {}

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Post()
  create(@Body() createVariationThemeDto: CreateVariationThemeDto) {
    return this.variationThemeService.create(createVariationThemeDto);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Get()
  findAll() {
    return this.variationThemeService.findAll();
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Get('available/:id')
  findAvailableAttributes(@Param('id') id: string) {
    return this.variationThemeService.findAvailableAttributes(id);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variationThemeService.findOne(id);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Patch(':id/add/:attributeId')
  addAttribute(
    @Param('id') id: string,
    @Param('attributeId') attributeId: string,
  ) {
    return this.variationThemeService.addAttribute(id, attributeId);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Patch(':id/remove/:attributeId')
  removeAttribute(
    @Param('id') id: string,
    @Param('attributeId') attributeId: string,
  ) {
    return this.variationThemeService.removeAttribute(id, attributeId);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVariationThemeDto: UpdateVariationThemeDto,
  ) {
    return this.variationThemeService.update(id, updateVariationThemeDto);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variationThemeService.remove(id);
  }
}
