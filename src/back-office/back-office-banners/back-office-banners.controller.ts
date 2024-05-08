import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BannerService } from 'src/banner/banner.service';
import { CreateBannerDto } from 'src/banner/dto/create-banner.dto';
import { FindBannerDto } from 'src/banner/dto/find-banner.dto';
import { RequiredPermissions } from 'src/permission/decorators/required-premission.decorator';
import { Permissions } from 'src/permission/enums/permissions.enum';
import { AdminGuard } from 'src/shared/guards/admin.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/shared/guards/permission.guard';

@ApiTags('Back-office-banners')
@Controller('back-office-banners')
@UseGuards(JwtAuthGuard, AdminGuard, PermissionGuard)

export class BackOfiiceBannersController {
    constructor(private bannerService: BannerService) { }
    
    @RequiredPermissions(Permissions.MANAGE_AD)
    @Post()
    createBrand(@Body() createBannerDto: CreateBannerDto) {
        return this.bannerService.create(createBannerDto);
    }

    @RequiredPermissions(Permissions.MANAGE_AD)
    @Get()
    findAll(@Query() findBannerFilter: FindBannerDto) {
        return this.bannerService.findAll(findBannerFilter);
    }

    @RequiredPermissions(Permissions.MANAGE_AD)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.bannerService.remove(id);
    }

    @RequiredPermissions(Permissions.MANAGE_AD)
    @Patch(':id/status')
    updateStatus(@Param('id') id: string) {
        return this.bannerService.changeStatus(id);
    }
}
