import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateGainDto } from '../dto/update-gain.dto';
import { GainService } from '../services/gain.service';

@ApiTags('Gain')
@Controller('gains')
export class GainController {
  constructor(private readonly gainService: GainService) {}

  @Get()
  findAll() {
    return this.gainService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGainDto: UpdateGainDto) {
    return this.gainService.update(id, updateGainDto);
  }
}
