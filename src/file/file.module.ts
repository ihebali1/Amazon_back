import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FileService } from './services/file.service';
import { FileController } from './controllers/file.controller';
import { File } from './entities/file.entity';
import { FileRepository } from './repositories/file.repository';

@Module({
  imports: [TypeOrmModule.forFeature([File, FileRepository])],
  providers: [FileService],
  controllers: [FileController],
  exports: [TypeOrmModule, FileService],
})
export class FileModule {}
