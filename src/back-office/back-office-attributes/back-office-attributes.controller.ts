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
import { CreateAttributeChoiceDto } from 'src/products/dto/create-attribute-choice.dto';
import { CreateAttributeDto } from 'src/products/dto/create-attribute.dto';
import { UpdateAttributeDto } from 'src/products/dto/update-attribute.dto';
import { AttributesService } from 'src/products/services/attributes.service';
import { AdminGuard } from 'src/shared/guards/admin.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/shared/guards/permission.guard';

@UseGuards(JwtAuthGuard, AdminGuard, PermissionGuard)
@ApiTags('Back-office-attributes')
@Controller('back-office-attributes')
export class BackOfiiceAttributesController {
  constructor(private readonly attributesService: AttributesService) {}

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Post()
  create(@Body() createAttributeDto: CreateAttributeDto) {
    return this.attributesService.create(createAttributeDto);
  }
  
  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Get()
  findAll() {
    return this.attributesService.findAll();
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attributesService.findOne(id);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAttributeDto: UpdateAttributeDto,
  ) {
    return this.attributesService.update(id, updateAttributeDto);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attributesService.remove(id);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Patch(':id/choices')
  addChoice(
    @Param('id') id: string,
    @Body() createAttributeChoiceDto: CreateAttributeChoiceDto,
  ) {
    return this.attributesService.addChoice(id, createAttributeChoiceDto);
  }

  @RequiredPermissions(Permissions.MANAGE_CONTENT)
  @Patch(':id/remove/:choiceId')
  removeChoice(@Param('choiceId') choiceId: string, @Param('id') id: string) {
    return this.attributesService.removeChoice(id, choiceId);
  }
}
