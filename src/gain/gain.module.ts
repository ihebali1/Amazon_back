import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GainController } from './controllers/gain.controller';
import { GainHistoryRepository } from './repositories/gain-history.repository';
import { GainRepository } from './repositories/gain.repository';
import { GainHistoryService } from './services/gain-history.service';
import { GainService } from './services/gain.service';

@Module({
  imports: [TypeOrmModule.forFeature([GainRepository, GainHistoryRepository])],
  controllers: [GainController],
  providers: [GainService, GainHistoryService],
  exports: [GainService, GainHistoryService],
})
export class GainModule { }
