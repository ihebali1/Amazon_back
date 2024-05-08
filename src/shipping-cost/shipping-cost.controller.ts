import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { ShippingCostService } from './shipping-cost.service';
import { UpdateShippingCostDto } from './dto/update-shipping-cost.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Shipping Cost')
@Controller('shipping-costs')
export class ShippingCostController {
  constructor(private readonly shippingCostService: ShippingCostService) {}

  @Get()
  findAll() {
    return this.shippingCostService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShippingCostDto: UpdateShippingCostDto,
  ) {
    return this.shippingCostService.update(id, updateShippingCostDto);
  }
}
