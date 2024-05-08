import { Module } from '@nestjs/common';
import { BannerModule } from 'src/banner/banner.module';
import { BackOfiiceBannersController } from './back-office-banners.controller';

@Module({
    imports: [BannerModule],
    controllers: [BackOfiiceBannersController],
  })
export class BackOfficeBannersModule {}