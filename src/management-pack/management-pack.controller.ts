import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ManagementPackService } from './management-pack.service';
import { CreateManagementPackDto } from './dto/create-management-pack.dto';
import { UpdateManagementPackDto } from './dto/update-management-pack.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Management pack')
@Controller('management-packs')
export class ManagementPackController {
  constructor(private readonly managementPackService: ManagementPackService) {}

  @Post()
  create(@Body() createManagementPackDto: CreateManagementPackDto) {
    return this.managementPackService.create(createManagementPackDto);
  }

  @Get()
  findAll() {
    return this.managementPackService.findAllFullDetails();
  }

  @Get('available-permissions/:id')
  findAvailablePermissions(@Param('id') id: string) {
    return this.managementPackService.findAvailablePermissions(id);
  }

  @Get('available-admins/:id')
  findAvailableAdmins(@Param('id') id: string) {
    return this.managementPackService.findAvailableAdmins(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managementPackService.findOneFullDetails(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateManagementPackDto: UpdateManagementPackDto,
  ) {
    return this.managementPackService.update(id, updateManagementPackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managementPackService.remove(id);
  }
}
