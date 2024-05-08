import { Module } from '@nestjs/common';
import { VatService } from './vat.service';
import { VatController } from './vat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VatRepository } from './repositories/vat.repository';
import { Vat } from './entities/vat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VatRepository, Vat])],
  controllers: [VatController],
  providers: [VatService],
})
export class VatModule {}
