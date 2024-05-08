import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryController } from './controllers/history.controller';
import { History } from './entities/history.entity';
import { ProductViewHistoryRepository } from './repositories/product-view-history.repository';
import { HistoryService } from './services/history.service';

@Module({
  imports: [TypeOrmModule.forFeature([History, ProductViewHistoryRepository])],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
