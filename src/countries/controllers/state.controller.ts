import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StateService } from '../services/state.service';

@ApiTags('States')
@Controller('states')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  findAll() {
    return this.stateService.findAll();
  }
}
