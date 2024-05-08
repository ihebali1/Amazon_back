import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { VatService } from './vat.service';
import { UpdateVatDto } from './dto/update-vat.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Vat')
@Controller('vats')
export class VatController {
  constructor(private readonly vatService: VatService) {}

  @Get()
  findAll() {
    return this.vatService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVatDto: UpdateVatDto) {
    return this.vatService.update(id, updateVatDto);
  }
}
