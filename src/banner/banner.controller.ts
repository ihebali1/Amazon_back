import { Controller, Get, Param, Query } from '@nestjs/common';
import { BannerService } from './banner.service';
import { FindBannerDto } from './dto/find-banner.dto';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) { }
  @Get()
  findAll(@Query() findBannerFilter: FindBannerDto) {
    return this.bannerService.findAll(findBannerFilter);
  }

  @Get(':id')
  findOne(@Param('id') id: string,) {
    return this.bannerService.findOne(id);
  }
}
