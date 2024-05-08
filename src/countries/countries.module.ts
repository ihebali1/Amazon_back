import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryController } from './controllers/country.controller';
import { StateController } from './controllers/state.controller';
import { CountryRepository } from './repositories/country.repository';
import { StateRepository } from './repositories/state.repository';
import { CountryService } from './services/country.service';
import { StateService } from './services/state.service';

@Module({
  imports: [TypeOrmModule.forFeature([CountryRepository, StateRepository])],
  controllers: [CountryController, StateController],
  providers: [CountryService, StateService],
})
export class CountriesModule {}
