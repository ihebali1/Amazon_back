import {
  Controller,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { OfferService } from '../services/offer.service';
import { ApiTags } from '@nestjs/swagger';
import { IsVendorActiveGuard } from 'src/shared/guards/is-vendor-active.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
@ApiTags('Offer')
@Controller('offers')
export class OfferController {
  constructor(private readonly offerService: OfferService) { }

  @UseGuards(JwtAuthGuard, IsVendorActiveGuard)
  @Patch(':id')
  findOne(@Param('id') id: string) {
    return this.offerService.endOffer(id);
  }

}
